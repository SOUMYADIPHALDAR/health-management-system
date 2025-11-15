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
router.get("/steps", verifyUser, getAllStepsRecords);
router.get("/steps/:stepId", verifyUser, getStepRecord);
router.put("/steps/:stepId", verifyUser, updateStepRecord);
router.delete("/steps/:stepId", verifyUser, deleteStepRecord);
router.delete("/steps", verifyUser, deleteAllStepRecords);

module.exports = router;