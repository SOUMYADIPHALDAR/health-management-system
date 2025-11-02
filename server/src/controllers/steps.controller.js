const asyncHandler = require('../utils/asyncHandler.js')
const apiError = require('../utils/apiError.js')
const apiResponse = require('../utils/apiError.js')
const Step = require('../models/steps.model.js')

const userStep = asyncHandler(async(req, res) =>{
    const {Steps, Date, Distance, Goal } = req.body 
    if(Steps === undefined || Steps<0 ){
        throw new apiError(400, "Steps value must be more than zero" )
    }

    const step = await Step.create({
        Steps,
        Date:  Date ? new Date(Date) : new Date(),
        Distance,
        Goal,
        User: req.user._id,
    });

    return res.status(200).json(new apiResponse(200, "Steps added sucessfully"))

})