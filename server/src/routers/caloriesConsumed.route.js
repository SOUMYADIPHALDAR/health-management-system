const express = require("express");
const router = express.Router();
const {
    addCaloriesConsumedRecord,
    getCalorieConsumedRecord,
    getAllCalorieConsumedRecords,
    updateCalorieConsumedRecord,
    deleteCalorieConsumedRecord,
    deleteAllCalorieConsumedRecord
} = require("../controllers/caloriesConsumed.controller.js");
const verifyUser = require("../middlewares/user.middleware.js");
const { getHeartRateRecord } = require("../controllers/heatthRate.controller");

router.post("/calorieConsumed-record", verifyUser, addCaloriesConsumedRecord);
router.get("/calorieConsumed-record", verifyUser, getAllCalorieConsumedRecords);
router.get("/one-calorieConsumed-record", verifyUser, getCalorieConsumedRecord);
router.patch("/update-calorieConsumed-record", verifyUser, updateCalorieConsumedRecord);
router.delete("/calorieConsumed-record", verifyUser, deleteAllCalorieConsumedRecord);
router.delete("/one-calorieConsumed-record", verifyUser, deleteCalorieConsumedRecord);

module.exports = router;