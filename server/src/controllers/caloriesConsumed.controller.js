const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const CaloriesConsumed = require("../models/CaloriesConsumed.model.js");

const addCaloriesConsumedRecord = asyncHandler(async(req, res) => {
    const { calorieType, caloriesConsumed, goal, date } = req.body;

    if (!calorieType || caloriesConsumed === undefined) {
        throw new apiError(400, "All fields are required..")
    }

    const completed = caloriesConsumed >= (goal || 2000);

    const record = await CaloriesConsumed.create({
        calorieType,
        caloriesConsumed,
        goal: goal || 2000,
        date: date ? new Date(date) : new Date(),
        user: req.user._id,
        completed
    });

    return res.status(201).json(
        new apiError(201, record, "Calory consumed record added successfully..")
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
    const page = presentIn(req.query.page) || 1;
    const limit = presentIn(req.query.limit) || 30;

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

module.exports = {
    addCaloriesConsumedRecord,
    getCalorieConsumedRecord,
    getAllCalorieConsumedRecords
};