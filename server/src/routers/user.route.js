const express = require("express");
const router = express.Router();
const {
  registerUser,
  loggedInUser,
} = require("../controllers/user.controller.js");
const upload = require("../middlewares/multer.middleware.js");

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loggedInUser);

module.exports = router;