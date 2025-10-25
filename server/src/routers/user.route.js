const express = require("express")
const router = express.Router()
const {RegisterUser} = require("../controllers/user.controller.js")
const multer = require("../middlewares/multer.middleware.js");
router.post("/register", multer.single("avatar"), RegisterUser);
module.exports = router;