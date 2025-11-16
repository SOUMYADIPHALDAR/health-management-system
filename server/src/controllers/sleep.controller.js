const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const Sleep = require("../models/sleep.model.js");
const User = require("../models/user.model.js");

const addSleep = asyncHandler(async(req, res) => {
    const { sleepTime, wakeupTime, sleepQuality, goal } = req.body;
    if (!sleepTime || !wakeupTime || !sleepQuality || !goal) {
        throw new apiError(400, "All fields are required..");
    }

    //validate sleep quality
    if (sleepQuality < 1 || sleepQuality > 5) {
        throw new apiError(400, "Sleep quality must be in between 1 to 5..");
    }

    //validate dates
    const sleepDate = new Date(sleepTime);
    const wakeDate = new Date(wakeupTime);

    if (sleepDate >= wakeDate) {
        throw new apiError(400, "Sleep time must be before wake up time..");
    }

    const finalGoal = goal || 8;

    // Calculate duration
    const diff = wakeDate - sleepDate; // ms
    const duration = Number((diff / (1000 * 60 * 60)).toFixed(1)); // hours

    const completed = duration >= (goal || 8)

    const sleep = await Sleep.create({
        user: req.user._id,
        sleepTime,
        sleepQuality,
        wakeupTime,
        duration,
        goal: finalGoal,
        completed
    });

    if (!sleep) {
        throw new apiError(400, "Failed to create sleep records..");
    }

    return res.status(201).json(
        new apiResponse(200, sleep, "sleep details added successfully..")
    )
});

const getSleepRecord = asyncHandler(async(req, res) => {
    const { sleepId } = req.params;

    if (!sleepId) {
        throw new apiError(400, "Sleep id is required..");
    }

    const sleep = await Sleep.findOne({
        _id: sleepId,
        user: req.user._id
    });
    if (!sleep) {
        throw new apiError(404, "No sleep record found..");
    }

    return res.status(200).json(
        new apiResponse(200, sleep, "Sleep record fetched successfully..")
    )
});

const getAllSleepRecords = asyncHandler(async(req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 30;

    const sleep = await Sleep.find({user: req.user._id})
    .sort({sleepTime: -1})
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const count = await Sleep.countDocuments({user: req.user._id});

    if (!sleep || sleep.length === 0) {
        throw new apiError(404, "No sleep records found..");
    }

    return res.status(200).json(
        new apiResponse(200,{
            sleep,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        }, "Fetched all sleep records successfully..")
    )
});

const updateSleepRecords = asyncHandler(async(req, res) => {
    const { newSleepTime, newWakeupTime, newSleepQuality, newGoal } = req.body;
    const { sleepId } = req.params;
    
    if (!sleepId) {
        throw new apiError(400, "Sleep id is required..");
    }

    const sleep = await Sleep.findOne({
        _id: sleepId,
        user: req.user._id
    });

    if (!sleep) {
        throw new apiError(404, "Sleep record not found..");
    }

    if (newSleepTime && newWakeupTime) {
        const newSleepDate = new Date(newSleepTime);
        const newWakeDate = new Date(newWakeupTime);
        if (newSleepDate >= newWakeDate) {
            throw new apiError(400, "Sleep time must be before wakeup time..")
        }
    }

    if (newSleepQuality && (newSleepQuality < 1 || newSleepQuality > 5)) {
        throw new apiError(400, "Sleep quality must be in between 1 to 5..");
    }

    const updateFields = {};
    if(newSleepTime) updateFields.sleepTime = newSleepTime;
    if (newWakeupTime) updateFields.wakeupTime = newWakeupTime;
    if(newSleepQuality) updateFields.sleepQuality = newSleepQuality;
    if(newGoal) updateFields.goal = newGoal;
    if (newSleepTime >= newGoal) {
        updateFields.completed = true
    } else {
        updateFields.completed = false
    }

    const updatedSleep = await Sleep.findByIdAndUpdate(
        sleepId,
        {
            $set: updateFields
        },
        { new: true }
    )

    return res.status(200).json(
        new apiResponse(200, updatedSleep, "Sleep records updated successfully..")
    )
});

const deleteOneSleepRecord = asyncHandler(async(req, res) => {
    const { sleepId } = req.params;
    if (!sleepId) {
        throw new apiError(400, "Sleep id is required..");
    }

    await Sleep.findOneAndDelete({
        _id: sleepId,
        user: req.user._id
    });

    return res.status(200).json(
        new apiResponse(200, "", "One sleep record is deleted successfully..")
    )
});

const deleteAllSleepRecords = asyncHandler(async(req, res) => {

    const sleep = await Sleep.find({user: req.user._id});
    
    if (!sleep || sleep.length === 0) {
        throw new apiError(404, "Sleep records not found..");
    }

    await Sleep.deleteMany({user: req.user._id});

    return res.status(200).json(
        new apiResponse(200, "", "All Sleep records deleted successfully..")
    )

});

module.exports = {
    addSleep,
    getSleepRecord,
    getAllSleepRecords,
    updateSleepRecords,
    deleteOneSleepRecord,
    deleteAllSleepRecords
};