const express = require("express");
const router = express.Router();
const {
    addHeartRateRecords,
    getHeartRateRecord,
    getAllHeartRateRecords,
    updateHeartRateRecord,
    deleteHeartRateRecord,
    deleteAllHeartRateRecords
} = require("../controllers/heatthRate.controller.js");
const verifyUser = require("../middlewares/user.middleware.js");

router.post("/heartRate", verifyUser, addHeartRateRecords);
router.get("/heartRate", verifyUser, getAllHeartRateRecords);
router.get("/heartRate/:heartRateId", verifyUser, getHeartRateRecord);
router.put("/heartRate/:heartRateId", verifyUser, updateHeartRateRecord);
router.delete("/heartRate", verifyUser, deleteAllHeartRateRecords);
router.delete("/heartRate/:heartRateId", verifyUser, deleteHeartRateRecord);

module.exports = router;