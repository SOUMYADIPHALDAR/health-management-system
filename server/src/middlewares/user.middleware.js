const apiError = require("../utils/apiError")
const asyncHandler = require("../utils/asyncHandler")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const verifyToken = asyncHandler(async(req, res, next) =>{
    try{
        const token = req.cookies?accessToken || req.headers["authorization"]?.replace("Bearer", "")
        if(!token){
            throw new apiError(401, "Access token is missing")
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodeToken._id).select("-password -refreshToken")
        if(!user){
            throw new apiError(404, "invalid token")
        }
        req.user = user 
        next()

    }
    catch(err){
        throw new apiError(401, "Invalid access token", err.message)
    }
})

module.exports = verifyToken
