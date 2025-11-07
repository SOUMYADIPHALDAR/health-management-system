const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const Sleep = require("../models/sleep.model.js");
const User = require("../models/user.model.js");

const addSleep = asyncHandler(async(req, res) => {
    const { sleepTime, wakeTime, sleepQuality, goal } = req.body;
    if (!sleepTime || !wakeTime || !sleepQuality || !goal) {
        throw new apiError(400, "All fields are required..");
    }

    const sleep = await Sleep.create({
        user: req.user._id,
        sleepTime,
        sleepQuality,
        wakeTime,
        goal: goal || 8
    })
    if (!sleep) {
        throw new apiError(400, "something happened during adding sleep details..");
    }

    return res.status(201).json(
        new apiResponse(200, sleep, "sleep details added successfully..")
    )
});

module.exports = {
    addSleep,
}