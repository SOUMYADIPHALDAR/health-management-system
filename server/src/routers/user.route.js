const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware.js");
const verifyUser = require("../middlewares/user.middleware.js");
const {
  registerUser,
  loggedInUser,
  logOutUser,
  refreshAccessToken,
  changePassword,
  updateAvatar,
} = require("../controllers/user.controller.js");

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loggedInUser);
router.post("/logout", verifyUser, logOutUser);
router.post("/refresh-access-token", refreshAccessToken);
router.post("/change-password", verifyUser, changePassword);
router.post("/update-avatar", verifyUser, upload.single("avatar"), updateAvatar);

module.exports = router;