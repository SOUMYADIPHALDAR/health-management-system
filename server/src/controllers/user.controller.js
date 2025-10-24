const asynHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const User = require("../models/user.model.js");
const multer = require("../middlewares/multer.middleware.js");
const uploadImageToCloudinary = require("../config/cloudinary.js");

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
        avatar: Avatar.url,
        avatarPublicId: Avatar.public_id
    })
    const CreatedUser = await User.findbyId(UpdatedUser_id).select("-password -generateRefreshToken");
    if(!CreatedUser){
        throw new apiError(500, "Registration Failed. Try again")
    }

    return res.status(201).json(new apiResponse(200, CreatedUser, "User Registered Sucessfully"))
    
});
module.exports = {
    RegisterUser
}
