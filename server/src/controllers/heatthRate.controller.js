const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const HeartRate = require("../models/heartRate.model.js");

const addHeartRateRecords = asyncHandler(async(req, res) => {
    const { heartRate, date } = req.body;

    if (!heartRate || heartRate < 30 || heartRate > 220) {
        throw new apiError(400, "Invalid heart rate..");
    }

    let status = "normal";
    if(heartRate < 60) status = "low";
    elseif (heartRate > 100) = "high";

    const record = await HeartRate.create({
        heartRate,
        date: date ? new Date(date) : new Date(),
        user: req.user._id
    });

    return res.status(201).json(
        new apiResponse(201, record, "Heart rate record added successfully..")
    );
});

const getHeartRateRecord = asyncHandler(async(req, res) => {
    const { heartRateId } = req.params;
    if (!heartRateId) {
        throw new apiError(400, "Heart rate id is required..");
    }

    const record = await HeartRate.findOne({
        _id: heartRateId,
        user: req.user._id
    });

    if (!record) {
        throw new apiError(404, "No such heart rate record found..");
    }

    return res.status(200).json(
        new apiResponse(200, record, "Heart rate record fetched successfully..")
    )
});

const getAllHeartRateRecords = asyncHandler(async(req, res) => {
    const page = presentIn(req.query.page) || 1;
    const limit = presentIn(req.query.limit) || 30;

    const records = await HeartRate.find({user: req.user._id})
    .limit(limit * 1)
    .skip((page - 1) * limit)

    if (!records) {
        throw new apiError(400, "No records found..")
    }

    return res.status(200).json(
        new apiResponse(200, records, "All heart rate records fetched successfully..")
    )
});

const updateHeartRateRecord = asyncHandler(async(req, res) => {
    const { heartRate, heartRateId } = req.body;
    if (!heartRateId) {
        throw new apiError(400, "Heart rate id is required..");
    }

    const record = await HeartRate.findOne({
        _id: heartRateId,
        user: req.user._id
    });

    if (!record) {
        throw new apiError(404, "No record found..");
    }

    const updatedFields = {}
    if(heartRate) updatedFields.heartRate = heartRate;

    const updatedRecord = await HeartRate.findByIdAndUpdate(
        req.user._id,
        { $set: updatedFields },
        { new: true }
    );

    return res.status(200).json(
        new apiResponse(200, updatedRecord, "Heart rate records updated successfully..")
    )
});

const deleteHeartRateRecord = asyncHandler(async(req, res) => {
    const { heartRateId } = req.params;
    if (!heartRateId) {
        throw new apiError(400, "Heart rate id is required..");
    }

    await HeartRate.findOneAndDelete({
        _id: heartRateId,
        user: req.user._id
    });

    return res.status(200).json(
        new apiResponse(200, "", "Heart rate record deleted successfully..")
    )
});

const deleteAllHeartRateRecords = asyncHandler(async(req, res) => {
    const records = await HeartRate.find({user: req.user._id});
    if (!records) {
        throw new apiError(404, "No heart rate record found..")
    }

    await HeartRate.deleteMany({user: req.user._id});

    return res.status(200).json(
        new apiResponse(200, "", "All heart rate records deleted successfully..")
    )
});

module.exports = {
    addHeartRateRecords,
    getHeartRateRecord,
    getAllHeartRateRecords,
    updateHeartRateRecord,
    deleteHeartRateRecord,
    deleteAllHeartRateRecords
};