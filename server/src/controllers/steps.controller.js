const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const Step = require("../models/steps.model.js");

const addStep = asyncHandler(async (req, res) => {
  const { steps, date, distance, goal } = req.body;
  if (steps === undefined || steps < 0) {
    throw new apiError(400, "Steps value must be more than zero");
  }

  const step = await Step.create({
    steps,
    date: date ? new Date(date) : new Date(),
    distance,
    goal,
    user: req.user._id,
  });
  if (!step) {
    throw new apiError(400, "something happened during step adding process..");
  }

  return res
    .status(201)
    .json(new apiResponse(200, step, "Steps added successfully"));
});

module.exports = {
  addStep,
};
