const express = require("express");
const router = express.Router();
const {
  RegisterUser,
  logInUser,
} = require("../controllers/user.controller.js");
const multer = require("../middlewares/multer.middleware.js");

router.post("/register", multer.single("avatar"), RegisterUser);
router.post("/login", logInUser);

module.exports = router;