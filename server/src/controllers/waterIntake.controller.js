const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const WaterIntake = require("../models/waterIntake.model.js");

const addWaterIntakeRecord = asyncHandler(async(req, res) => {
    const { intake, date, goal } = req.body;
    if (intake === undefined || intake < 0) {
        throw new apiError(400, "Intake is required..");
    }

    const completed = intake >= (goal || 5);

    const waterIntake = await WaterIntake.create({
        intake,
        date: date ? new Date(date) : new Date(),
        goal,
        completed,
        user: req.user._id
    });

    if (!waterIntake) {
        throw new apiError(500, "Failed to add water intake..");
    }

    return res.status(201).json(
        new apiResponse(201, waterIntake, "Water intake record added successfully..")
    )
});

const getWaterIntakeRecord = asyncHandler(async(req, res) => {
    const { intakeId } = req.params;

    if (!intakeId) {
        throw new apiError(400, "Intake id is required..");
    }

    const waterIntake = await WaterIntake.findOne({
        _id: intakeId,
        user: req.user._id
    });
    if (!waterIntake) {
        throw new apiError(404, "Water intake record not found..");
    }

    return res.status(200).json(
        new apiResponse(200, waterIntake, "Water intake record fetched successfully...")
    )
});

const getAllWaterIntakeRecord = asyncHandler(async(req, res) => {
    const page = presentIn(req.query.page) || 1;
    const limit = presentIn(req.query.limit) || 30;

    const waterIntake = await WaterIntake.find({user: req.user._id})
    .limit(limit * 1)
    .skip((page - 1) * limit)

    if (!waterIntake) {
        throw new apiError(404, "No water intake record found")
    }

    const count = await WaterIntake.countDocuments({user: req.user._id});

    return res.status(200).json(
        new apiResponse(
            200,
            {
                waterIntake,
                totalPage: Math.ceil(count / limit),
                currentPage: page
            },
            "All water intake records fetched successfully.."
        )
    )
});

const updateWaterIntakeRecord = asyncHandler(async(req, res) => {
    const { intake, goal } = req.body;
    const { waterIntakeId } = req.params;

    const waterIntake = await WaterIntake.findOne({
        _id: waterIntakeId,
        user: req.user._id
    });

    if (!waterIntake) {
        throw new apiError(404, "No water intake record found..");
    }

    const updatedFields = {}
    if(intake) updatedFields.intake = intake;
    if(goal) updatedFields.goal = goal;

    const updatedWaterIntakeRecord = await WaterIntake.findByIdAndUpdate(
        waterIntake._id,
        { $set: updatedFields },
        { new: true }
    )

    return res.status(200).json(
        new apiResponse(200, updatedWaterIntakeRecord, "Water intake record updated successfully..")
    )
});

const deleteWaterIntakeRecord = asyncHandler(async(req, res) => {
    const { waterIntakeId } = req.params;
    if (!waterIntakeId) {
        throw new apiError(400, "Water intake id is required..");
    }

    await WaterIntake.findOneAndDelete({
        _id: waterIntakeId,
        user: req.user._id
    });

    return res.status(200).json(
        new apiResponse(200, "", "water intake record deleted successfully..")
    )
});

const deleteAllWaterIntakeRecords = asyncHandler(async(req, res) => {
    const waterIntake = await WaterIntake.find({user: req.user._id});

    if (!waterIntake) {
        throw new apiError(400, "Water intake records not found..");
    }

    await WaterIntake.deleteMany({user: req.user._id});

    return res.status(200).json(
        new apiResponse(200, "", "Deleted all records successfully..")
    )
});

module.exports = {
    addWaterIntakeRecord,
    getWaterIntakeRecord,
    getAllWaterIntakeRecord,
    updateWaterIntakeRecord,
    deleteWaterIntakeRecord,
    deleteAllWaterIntakeRecords
};