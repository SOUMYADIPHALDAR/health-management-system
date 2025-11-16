const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const CaloriesConsumed = require("../models/CaloriesConsumed.model.js");

const addCaloriesConsumedRecord = asyncHandler(async(req, res) => {
    const { calorieType, caloriesConsumed, goal, date } = req.body;

    if (!calorieType || caloriesConsumed === undefined) {
        throw new apiError(400, "All fields are required..")
    }

    const record = await CaloriesConsumed.create({
        calorieType,
        caloriesConsumed,
        goal: goal || 2000,
        date: date ? new Date(date) : Date.now(),
        user: req.user._id,
    });

    return res.status(201).json(
        new apiResponse(201, record, "Calory consumed record added successfully..")
    )
});

const getCalorieConsumedRecord = asyncHandler(async(req, res) => {
    const { caloriesConsumedId } = req.params;

    if (!caloriesConsumedId) {
        throw new apiError(400, "calorie consumed id is required..");
    }

    const record = await CaloriesConsumed.findOne({
        _id: caloriesConsumedId,
        user: req.user._id
    });

    if (!record) {
        throw new apiError(404, "No calorie consumed record found..");
    }

    return res.status(200).json(
        new apiResponse(200, record, "Calorie consumed record fetched successfully..")
    )
});

const getAllCalorieConsumedRecords = asyncHandler(async(req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 30;

    const records = await CaloriesConsumed.find({user: req.user._id})
    .limit(limit * 1)
    .skip((page - 1) * limit)

    const count = await CaloriesConsumed.countDocuments({user: req.user._id});

    if (!records || records.length === 0) {
        throw new apiError(404, "No such calorie consumed record found")
    }

    return res.status(200).json(
        new apiResponse(
            200,
            {
                records,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            },
            "All calorie consumed records fetched successfully.."
        )
    )
});

const updateCalorieConsumedRecord = asyncHandler(async(req, res) => {
    const { calorieType, caloriesConsumed, goal } = req.body;
    const { caloriesConsumedId } = req.params;

    if (!caloriesConsumedId) {
        throw new apiError(400, "Calorie consumed id is required..");
    }

    const record = await CaloriesConsumed.findOne({
        _id: caloriesConsumedId,
        user: req.user._id
    });

    if (!record) {
        throw new apiError(404, "No calorie consumed record found..");
    }
    
    const updatedFields = {}
    if(calorieType) updatedFields.calorieType = calorieType;
    if(caloriesConsumed) updatedFields.caloriesConsumed = caloriesConsumed;
    if(goal) updatedFields.goal = goal;

    const updatedRecord = await CaloriesConsumed.findByIdAndUpdate(
        caloriesConsumedId,
        {
            $set: updatedFields
        },
        { new: true }
    );

    return res.status(200).json(
        new apiResponse(200, updatedRecord, "Calorie consumed record updated successfully..")
    )
});

const deleteCalorieConsumedRecord = asyncHandler(async(req, res) => {
    const { caloriesConsumedId } = req.params;

    if (!caloriesConsumedId) {
        throw new apiError(400, "Calorie consumed id is required..");
    }

    await CaloriesConsumed.findOneAndDelete({
        _id: caloriesConsumedId,
        user: req.user._id
    });

    return res.status(200).json(
        new apiResponse(200, "", "Calorie consumed record deleted successfully..")
    )
});

const deleteAllCalorieConsumedRecord = asyncHandler(async(req, res) => {
    const records = await CaloriesConsumed.find({user: req.user._id});

    if (!records || records.length === 0) {
        throw new apiError(404, "Calorie consumed records not found..")
    }

    await CaloriesConsumed.deleteMany({user: req.user._id});

    return res.status(200).json(
        new apiResponse(200, "", "All calorie consumed records are deleted successfully..")
    )
});

module.exports = {
    addCaloriesConsumedRecord,
    getCalorieConsumedRecord,
    getAllCalorieConsumedRecords,
    updateCalorieConsumedRecord,
    deleteCalorieConsumedRecord,
    deleteAllCalorieConsumedRecord
};