const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const User = require("../models/user.model.js");
const multer = require("../middlewares/multer.middleware.js");
const uploadImageToCloudinary = require("../config/cloudinary.js");

const tokenAccess = async (checkUserId) => {
  const useridFound = await User.findById(checkUserId);
  const accessToken = useridFound.generateAccessToken(checkUserId);
  const refreshToken = useridFound.generateRefreshToken(checkUserId);
  useridFound.refreshToken = refreshToken;
  await useridFound.save({ validateBeforeSave: true });
  return { accessToken, refreshToken };
};

const RegisterUser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password, gender } = req.body;
  if (!fullName || !userName || !email || !password || !gender) {
    throw new apiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
  if (existingUser) {
    throw new apiError(400, "User already exists");
  }
  
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new apiError(400, "File path not found");
  }
  const avatar = await uploadImageToCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new apiError(400, "Response not found");
  }

  const updatedUser = await User.create({
    fullName,
    userName,
    email,
    password,
    gender,
    avatar: avatar.secure_url,
    avatarPublicId: avatar.public_id,
  });

  const createdUser = await User.findById(updatedUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Registration Failed. Try again");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User Registered Successfully"));
});

const logInUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email) {
    throw new apiError(400, "All fields are required");
  }

  const checkUser = await User.findOne({ $or: [{ userName }, { email }] });
  if (!checkUser) {
    throw new apiError(404, "User not found");
  }
  
  const checkPassword = await checkUser.isPasswordCorrect(password);
  if (!checkPassword) {
    throw new apiError(400, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await tokenAccess(checkUser._id);

  const logedinUser = await User.findById(checkUser._id).select(
    "-password -refreshToken"
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new apiResponse(
        200,
        { user: logedinUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});
module.exports = {
  RegisterUser,
  logInUser,
};
