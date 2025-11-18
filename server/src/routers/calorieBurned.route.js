const express = require("express");
const router = express.Router();
const {
    addCalorieBurnedRecords,
    getCalorieBurnedRecord,
    getAllCalorieBurnedRecords,
    updateCalorieBurnedRecords,
    deleteCalorieBurnedRecord,
    deleteAllCalorieBurnedRecord
} = require("../controllers/calorieBurned.controller.js");
const verifyUser = require("../middlewares/user.middleware.js");

router.post("/calorieBurned", verifyUser, addCalorieBurnedRecords);
router.get("/calorieBurned", verifyUser, getAllCalorieBurnedRecords);
router.get("/calorieBurned/:caloriesBurnedId", verifyUser, getCalorieBurnedRecord);
router.put("/calorieBurned/:caloriesBurnedId", verifyUser, updateCalorieBurnedRecords);
router.delete("/calorieBurned", verifyUser, deleteAllCalorieBurnedRecord);
router.delete("/calorieBurned/:caloriesBurnedId", verifyUser, deleteCalorieBurnedRecord);

module.exports = router;