const express = require("express");
const router = express.Router();
const {
    addWaterIntakeRecord,
    getWaterIntakeRecord,
    getAllWaterIntakeRecord,
    updateWaterIntakeRecord,
    deleteWaterIntakeRecord,
    deleteAllWaterIntakeRecords
} = require("../controllers/waterIntake.controller.js");
const verifyUser = require("../middlewares/user.middleware.js");

router.post("/waterIntake", verifyUser, addWaterIntakeRecord);
router.get("/waterIntake", verifyUser, getAllWaterIntakeRecord);
router.get("/one-waterIntake", verifyUser, getWaterIntakeRecord);
router.put("/update-waterIntake", verifyUser, updateWaterIntakeRecord);
router.delete("/delete-waterIntake", verifyUser, deleteWaterIntakeRecord);
router.delete("delete-all-waterIntake", verifyUser, deleteAllWaterIntakeRecords);

module.exports = router;