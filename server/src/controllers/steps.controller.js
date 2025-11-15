const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const Step = require("../models/steps.model.js");

const addStepRecords = asyncHandler(async (req, res) => {
  const { steps, date, distance, goal } = req.body;
  if (steps === undefined || steps < 0) {
    throw new apiError(400, "Steps value must be more than zero");
  }

  const completed = steps >= (goal || 10000);

  const step = await Step.create({
    steps,
    date: date ? new Date(date) : new Date(),
    distance: distance ?? 0,
    goal: goal ?? 10000,
    completed,
    user: req.user._id,
  });
  if (!step) {
    throw new apiError(400, "something happened during step adding process..");
  }

  return res
    .status(201)
    .json(new apiResponse(200, step, "Steps added successfully"));
});

const getAllStepsRecords = asyncHandler(async(req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.page) || 30;

  const steps = await Step.find({user: req.user._id})
  .limit(limit*1)
  .skip((page - 1) * limit)

  const count = await Step.countDocuments({user: req.user._id});

  if (!steps || steps.length === 0) {
    throw new apiError(404, "No step records found..");
  }

  return res.status(200).json(
    new apiResponse(
      200,
      {
        steps,
        totalPages: Math.ceil( count / limit),
        currentPage: page
      },
      "Fetched all step records successfully.."
    )
  )
});

const getStepRecord = asyncHandler(async(req, res) => {
  const { stepId } = req.params;
  if (!stepId) {
    throw new apiError(400, "Sleep id is required..");
  }

  const step = await Step.findOne({
    _id: stepId,
    user: req.user._id
  });
  if (!step) {
    throw new apiError(404, "Step record not found..");
  }

  return res.status(200).json(
    new apiResponse(200, step, "Fetched step record successfully..")
  )
});

const updateStepRecord = asyncHandler(async(req, res) => {
  const { newSteps, newDate, newDistance, newGoal } = req.body;
  const { stepId } = req.params;
  
  if(!stepId){
    throw new apiError(400, "Step id is required..");
  }

  const step = await Step.findOne({
    _id: stepId,
    user: req.user._id
  });
  if (!step) {
    throw new apiError(404, "Step record not found..");
  }

  const updatedFields = {};
  if(newSteps) updatedFields.steps = newSteps;
  if(newDate) updatedFields.date = newDate;
  if(newDistance) updatedFields.distance = newDistance;
  if(newGoal) updatedFields.goal = newGoal;
  if(newSteps >= newGoal) {
    updatedFields.completed = true
  } else {
    updatedFields.completed = false
  };

  const updatedStep = await Step.findByIdAndUpdate(
    stepId,
    { $set: updatedFields },
    { new: true }
  )

  return res.status(200).json(
    new apiResponse(200, updatedStep, "Step record updated successfully..")
  )
});

const deleteStepRecord = asyncHandler(async(req, res) => {
  const { stepId } = req.params;

  if (!stepId) {
    throw new apiError(400, "Step id is required...");
  }

  await Step.findOneAndDelete({
    _id: stepId,
    user: req.user._id
  });

  return res.status(200).json(
    new apiResponse(200, "", "Step record deleted successfully..")
  )
});

const deleteAllStepRecords = asyncHandler(async(req, res) => {
  const steps = await Step.find({ user: req.user._id });
  if (!steps || steps.length === 0) {
    throw new apiError(400, "Steps record not found..");
  }

  await Step.deleteMany({user: req.user._id});

  return res.status(200).json(
    new apiResponse(200, "", "step records deleted successfully..")
  )
});

module.exports = {
  addStepRecords,
  getAllStepsRecords,
  getStepRecord,
  updateStepRecord,
  deleteStepRecord,
  deleteAllStepRecords
};
