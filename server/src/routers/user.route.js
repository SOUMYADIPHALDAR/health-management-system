const express = require("express");
const router = express.Router();
const {
  RegisterUser,
  logInUser,
} = require("../controllers/user.controller.js");
const upload = require("../middlewares/multer.middleware.js");

router.post("/register", upload.single("avatar"), RegisterUser);
router.post("/login", logInUser);

module.exports = router;