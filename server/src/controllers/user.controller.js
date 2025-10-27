const asynHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const User = require("../models/user.model.js");
const multer = require("../middlewares/multer.middleware.js");
const uploadImageToCloudinary = require("../config/cloudinary.js");
const jwt = require("jsonwebtoken")
const tokenAccess = async (checkUserId) => {
    const useridFound = await User.findbyId(checkUserId)
    const accessToken = useridFound.generateAccessToken(checkUserId) // with id generate access token 
    const refreshToken = useridFound.generateRefreshToken(checkUserId)
    useridFound.refreshToken = refreshToken
    await useridFound.save({ validatebeforeSave: true })
    return { accessToken, refreshToken }
}

const RegisterUser = asynHandler(async (req, res) => {
    const {
        FullName,
        UserName,
        email,
        password,
        Gender
    } = req.body
    if (!FullName || !UserName || !email || !password || !Gender) {
        throw new apiError(400, "All fields are required")
    }
    const ExistingUser = await User.findOne({ $or: [{ UserName }, { email }] })
    if (ExistingUser) {
        throw new apiError(400, "User already exist")
    }
    const AvatarLocalPath = req.file?.path
    if (!AvatarLocalPath) {
        throw new apiError(400, "File path not found")
    }
    const Avatar = await uploadImageToCloudinary(AvatarLocalPath)
    if (!Avatar) {
        throw new apiError(400, "Response not found")
    }

    const UpdatedUser = await User.create({
        FullName,
        UserName,
        email,
        password,
        Gender,
        avatar: Avatar.secure_url,
        avatarPublicId: Avatar.public_id
    })
    const CreatedUser = await User.findbyId(UpdatedUser_id).select("-password -refreshToken");
    if (!CreatedUser) {
        throw new apiError(500, "Registration Failed. Try again")
    }

    return res.status(201).json(new apiResponse(200, CreatedUser, "User Registered Sucessfully"))

});

const logedinUser = asynHandler(async (req, res) => {

    const {
        UserName,
        email,
        password
    } = req.body

    if (!UserName || !email) {
        throw new apiError(400, "All fields are required")
    }

    const checkUser = await User.findOne({ $or: [{ UserName }, { email }] })
    if (!checkUser) {
        throw new apiError(404, "User not found")
    }
    const checkPassword = await checkUser.isPasswordCorrect(password)
    if (!checkPassword) {
        throw new apiError(400, "Password is incoreect")
    }

    const { accessToken, refreshToken } = await tokenAccess(checkUser._id)

    const logedinUser = await User.findbyId(checkUser._id).select("-password -refreshtoken")
    const option = {
        httponly: true,
        secure: true,
    }
    return res.status(200).cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option).json(new apiResponse(200, { user: logedinUser, accessToken, refreshToken }, "User logged in sucessfully"))


})

const loggedOutUser = asynHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } }, { new: true })
    const option = {
        httponly: true,
        secure: true,
    }
    return res.status(200).clearCookie("accessToken", option).clearCookie("refreshToken", option).json(new apiResponse(200, null, "User logged out sucessfully"))
})

const refreshAccessToken = asynHandler(async (req, res) => {
    const getUserRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!getUserRefreshToken) {
        throw new apiError(401, "Unauthorized request")
    }
    try {

        const verifyRefreshToken = jwt.verify(getUserRefreshToken, REFRESH_TOKEN_SECRET)
        const user = await User.findById(verifyRefreshToken._id)
        if (!user) {
            throw new apiError(404, "Invalid refresh token")
        }
        if (getUserRefreshToken !== user?.refreshToken) {
            throw new apiError(401, "Refresh token is expired")
        }
        option = {
            httponly: true,
            secure: true
        }

        const { newaccessToken, newrefreshToken } = await tokenAccess(user._id)
        return res.status(200).cookie("accessToken", newaccessToken, option).cookie("refreshToken", newrefreshToken, option).json(new apiResponse(200, { accessToken: newaccessToken, refreshToken: newrefreshToken }, "Access token refreshed sucessfully"))

    }
    catch (err) {
        throw new apiError(500, err.message)
    }
})

module.exports = {
    RegisterUser,
    logedinUser,
    loggedOutUser,
    refreshAccessToken

}
