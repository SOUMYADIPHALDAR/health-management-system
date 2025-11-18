const asyncHandler = require("../utils/asyncHandler.js");
const apiResponse = require("../utils/apiResponse.js");
const apiError = require("../utils/apiError.js");
const CaloriesBurned = require("../models/CaloriesBurned.model.js");

const addCalorieBurnedRecords = asyncHandler(async(req, res) => {
    const { activity, activityDuration, caloriesBurned, date, goal } = req.body;

    if (!activity || !activityDuration || !caloriesBurned || !goal) {
        throw new apiError(400, "All fields are required..")
    }

    const complete = caloriesBurned >= (goal || 500)

    const record = await CaloriesBurned.create({
        activity,
        activityDuration,
        caloriesBurned,
        completed: complete,
        date: date ? new Date(date) : Date.now(),
        goal,
        user: req.user._id
    });

    return res.status(201).json(
        new apiResponse(201, record, "Add calorie burned record successfully..")
    )
});

const getCalorieBurnedRecord = asyncHandler(async(req, res) => {
    const { caloriesBurnedId } = req.params;

    if (!caloriesBurnedId) {
        throw new apiError(400, "calorie burned id is required..")
    }

    const record = await CaloriesBurned.findOne({
        _id: caloriesBurnedId,
        user: req.user._id
    });

    if (!record || record.length === 0) {
        throw new apiError(404, "No record found..")
    }

    return res.status(200).json(
        new apiResponse(200, record, "Calorie burned record fetched successfully..")
    )
});

const getAllCalorieBurnedRecords =asyncHandler(async(req, res) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 30);

    const records = await CaloriesBurned.find({user: req.user._id})
    .limit(limit * 1)
    .skip((page - 1) * limit)

    if (!records || records.length === 0) {
        throw new apiError(404, "No such record found..");
    }

    const count = await CaloriesBurned.countDocuments({user: req.user._id});

    return res.status(200).json(
        new apiResponse(200,
            {
                records,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            },
            "Fetched all records successfully.."
        )
    )
});

const updateCalorieBurnedRecords = asyncHandler(async(req, res) => {
    const { newActivity, newActivityDuration, newCaloriesBurned, newDate, newGoal } = req.body;
    const { caloriesBurnedId } = req.params;

    if (!caloriesBurnedId) {
        new apiError(400, "Calorie burned id is required..");
    }

    const record = await CaloriesBurned.findOne({
        _id: caloriesBurnedId,
        user: req.user._id
    });

    if (!record) {
        throw new apiError(404, "No record found..");
    }

    const updatedFields = {}
    if(newActivity) updatedFields.activity = newActivity;
    if(newActivityDuration) updatedFields.activityDuration = newActivityDuration;
    if(newCaloriesBurned) updatedFields.caloriesBurned = newCaloriesBurned;
    if(newDate) updatedFields.date = newDate;
    if(newGoal) updatedFields.goal = newGoal;

    const updatedRecord = await CaloriesBurned.findByIdAndUpdate(
        caloriesBurnedId,
        {
            $set: updatedFields
        },
        { new: true }
    );

    return res.status(200).json(
        new apiResponse(200, updatedRecord, "Calorie burned records updated successfully..")
    )
});

const deleteCalorieBurnedRecord = asyncHandler(async(req, res) => {
    const { caloriesBurnedId } = req.params;

    if (!caloriesBurnedId) {
        throw new apiError(400, "calorie burned id is required..");
    }

    await CaloriesBurned.findOneAndDelete({
        _id: caloriesBurnedId,
        user: req.user._id
    });

    return res.status(200).json(
        new apiResponse(200, "", "Calorie burned record deleted successfully..")
    )
});

const deleteAllCalorieBurnedRecord = asyncHandler(async(req, res) => {
    const records = await CaloriesBurned.find({ user: req.user._id });

    if (!records || records.length === 0) {
        throw new apiError(404, "No records found..")
    }

    await CaloriesBurned.deleteMany({ user: req.user._id });

    return res.status(200).json(
        new apiResponse(200, "", "All calorie burned records are deleted successfully..")
    )
});

module.exports = {
    addCalorieBurnedRecords,
    getCalorieBurnedRecord,
    getAllCalorieBurnedRecords,
    updateCalorieBurnedRecords,
    deleteCalorieBurnedRecord,
    deleteAllCalorieBurnedRecord
};