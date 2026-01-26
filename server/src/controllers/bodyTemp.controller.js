const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const BodyTemp = require("../models/bodyTemp.model.js");

const addBodyTemp = asyncHandler(async(req, res) => {
    const { bodyTemp } = req.body;

    if(!bodyTemp){
        throw new apiError(400, "body temparature is required..");
    }

    let status = "Normal";
    if(bodyTemp > 100) status = "Fever";
    if(bodyTemp < 97) status = "Hypothermia";

    const record = await BodyTemp.create({
        bodyTemp,
        status,
        Date: Date.now(),
        user: req.user._id
    });

    return res.status(201).json(
        new apiResponse(200, record, "Body temparature record added successfully..")
    );
});

module.exports = {
    addBodyTemp
}