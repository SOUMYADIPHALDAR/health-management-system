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

router.post("/calorieConsumed", verifyUser, addCaloriesConsumedRecord);
router.get("/calorieConsumed", verifyUser, getAllCalorieConsumedRecords);
router.get("/calorieConsumed/:caloriesConsumedId", verifyUser, getCalorieConsumedRecord);
router.put("/calorieConsumed/:caloriesConsumedId", verifyUser, updateCalorieConsumedRecord);
router.delete("/calorieConsumed", verifyUser, deleteAllCalorieConsumedRecord);
router.delete("/calorieConsumed/:caloriesConsumedId", verifyUser, deleteCalorieConsumedRecord);

module.exports = router;