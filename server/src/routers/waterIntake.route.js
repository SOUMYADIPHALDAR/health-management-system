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
router.get("/waterIntake/:intakeId", verifyUser, getWaterIntakeRecord);
router.put("/waterIntake/:waterIntakeId", verifyUser, updateWaterIntakeRecord);
router.delete("/waterIntake/:waterIntakeId", verifyUser, deleteWaterIntakeRecord);
router.delete("/waterIntake", verifyUser, deleteAllWaterIntakeRecords);

module.exports = router;