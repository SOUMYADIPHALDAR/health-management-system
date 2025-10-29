const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/apiError.js");
const apiResponse = require("../utils/apiResponse.js");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const uploadImageToCloudinary = require("../config/cloudinary.js");
const cloudinary = require("cloudinary").v2;

const tokenAccess = async (checkUserId) => {
  const useridFound = await User.findById(checkUserId);
  const accessToken = useridFound.generateAccessToken(checkUserId);
  const refreshToken = useridFound.generateRefreshToken(checkUserId);
  useridFound.refreshToken = refreshToken;
  await useridFound.save({ validateBeforeSave: true });
  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
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

const loggedInUser = asyncHandler(async (req, res) => {
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

const logOutUser = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined }
    },
    { new: true}
  );

  const option = {
    httpOnly: true,
    secure: true
  }

  return res.status(200).json(
    new apiResponse(200, "", "User logged out successfully..")
  )
});

const refreshAccessToken = asyncHandler(async(req, res) => {
  const isComingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!isComingRefreshToken) {
    throw new apiError(400, "Unauthorized access..");
  }

  try {
    const decodeToken = jwt.verify(isComingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodeToken._id);
    if (!user) {
      throw new apiError(401, "Invalid token..");
    }

    if (isComingRefreshToken !== user.refreshToken) {
      throw new apiError(401, "Refresh token is invalid or expired..")
    }

    const { newAccessToken, newRefreshToken } = await tokenAccess(user._id);
    const option = {
      httpOnly: true,
      secure: true
    }

    return res.status(200)
    .cookie("accessToken", newAccessToken, option)
    .cookie("refreshToken", newRefreshToken, option)
    .json(
      new apiResponse(
        200,
        {accessToken: newAccessToken, refreshToken: newRefreshToken},
        "Access token refreshed.."
      )
    )

  } catch (error) {
    throw new apiError(500, error.message);
  }
});

const changePassword = asyncHandler(async(req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user._id

  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "user not found..");
  }

  const correctPassword = await user.isPasswordCorrect(currentPassword);
  if (!correctPassword) {
    throw new apiError(400, "Wrong password..");
  }

  if (newPassword !== confirmPassword) {
    throw new apiError(400, "New and confirm password must be same..")
  }

  user.password = newPassword;
  await user.save({validateBeforeSave: false});

  return res.status(200).json(
    new apiResponse(200, "", "password changed successfully..")
  )
});

const updateAvatar = asyncHandler(async(req, res) => {
  const avatarLocalPath = req.file?.path;
  const userId = req.user._id;

  if (!avatarLocalPath) {
    throw new apiError(404, "Avatar file is required..");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "User not found..");
  }

  if (user.avatarPublicId) {
    try {
      await cloudinary.uploader.destroy(user.avatarPublicId,{resource_type: "image"});

    } catch (error) {
      throw new apiError(500, "Something happend during update avatar..");
    }
  }

  const avatar = await uploadImageToCloudinary(avatarLocalPath);
  if (!avatar.secure_url || !avatar.public_id) {
    throw new apiError(400, "Failed to upload image..");
  }

  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        avatar: avatar.secure_url,
        avatarPublicId: avatar.public_id
      }
    },
    {new: true}
  );

  return res.status(200).json(
    new apiResponse(200, updateUser, "Avatar updated successfully..")
  )
})

module.exports = {
  registerUser,
  loggedInUser,
  logOutUser,
  refreshAccessToken,
  changePassword,
  updateAvatar
};