const express = require("express");
const router = express.Router();
const {
  addStepRecords,
  getAllStepsRecords,
  getStepRecord,
  updateStepRecord,
  deleteStepRecord,
  deleteAllStepRecords
} = require("../controllers/steps.controller.js");
const verifyUser = require("../middlewares/user.middleware.js");

router.post("/steps", verifyUser, addStepRecords);
router.get("/all-steps", verifyUser, getAllStepsRecords);
router.get("/steps", verifyUser, getStepRecord);
router.patch("/update-stepRecord", verifyUser, updateStepRecord);
router.delete("/delete-stepRecord", verifyUser, deleteStepRecord);
router.delete("/delete-all-stepRecords", verifyUser, deleteAllStepRecords);

module.exports = router;