const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const User = require("../models/user.model.js");
const multer = require("../middlewares/multer.middleware.js");
const uploadImageToCloudinary = require("../config/cloudinary.js");
const tokenAccess = async(checkUserId) =>{
    const useridFound = await User.findbyId(checkUserId)
    const accessToken = useridFound.generateAccessToken(checkUserId)
    const refreshToken = useridFound.generateRefreshToken(checkUserId)
    useridFound.refreshToken = refreshToken 
    await useridFound.save({validatebeforeSave: true})
    return {accessToken, refreshToken}
}

const RegisterUser = asynHandler(async(req, res) =>{
    const{
        FullName , 
        UserName, 
        email,
        password,
        Gender
    } = req.body
    if(!FullName|| !UserName || !email || !password || !Gender){
        throw new apiError(400, "All fields are required")
    }
    const ExistingUser = await User.findOne({$or:[{UserName}, {email}]})
    if(ExistingUser){
        throw new apiError(400, "User already exist")
    }
    const AvatarLocalPath = req.file?.path 
    if(!AvatarLocalPath){
        throw new apiError(400, "File path not found")
    }
    const Avatar = await uploadImageToCloudinary(AvatarLocalPath)
    if(!Avatar){
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
    if(!CreatedUser){
        throw new apiError(500, "Registration Failed. Try again")
    }

    return res.status(201).json(new apiResponse(200, CreatedUser, "User Registered Sucessfully"))
    
});

const logedinUser = asynHandler(async(req, res) =>{

    const{
        UserName,
        email,
        password
    } = req.body

    if(!UserName || !email ){
        throw new apiError(400, "All fields are required")
    }

    const checkUser = await User.findOne({$or: [{UserName}, {email}]})
    if(!checkUser){
        throw new apiError(404, "User not found")
    }
    const checkPassword = await checkUser.isPasswordCorrect(password)
    if(!checkPassword){
        throw new apiError(400, "Password is incoreect")
    }

    const {accessToken, refreshToken} = await tokenAccess(checkUser. _id)

    const logedinUser = await User.findbyId(checkUser._id).select("-password -refreshtoken")
    const option = {
        httponly: true,
        secure: true,
    }
    return res.status(200).cookie("accessToken", accessToken, option).cookie("refreshToken", refreshToken, option).json(new apiResponse(200, {user: logedinUser, accessToken, refreshToken}, "User logged in sucessfully"))


})
module.exports = {
    RegisterUser,
    logedinUser
}
