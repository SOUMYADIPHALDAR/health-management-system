const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/user.middleware.js");
const {
  registerUser,
  loggedInUser,
  logOutUser,
  refreshAccessToken,
  changePassword,
} = require("../controllers/user.controller.js");

router.post("/register", registerUser);
router.post("/login", loggedInUser);
router.post("/logout", verifyUser, logOutUser);
router.post("/refresh-access-token", refreshAccessToken);
router.put("/change-password", verifyUser, changePassword);

module.exports = router;