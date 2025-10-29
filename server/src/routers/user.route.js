const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware.js");
const verifyToken = require("../middlewares/user.middleware.js");
const {
  registerUser,
  loggedInUser,
  logOutUser,
  refreshAccessToken,
  changePassword,
  updateAvatar,
} = require("../controllers/user.controller.js");
const upload = require("../middlewares/multer.middleware.js");

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loggedInUser);
router.post("/logout", verifyToken, logOutUser);
router.post("/refresh-access-token", refreshAccessToken);
router.post("/change-password", verifyToken, changePassword);
router.post("/update-avatar", verifyToken, upload.single("avatar"), updateAvatar);

module.exports = router;