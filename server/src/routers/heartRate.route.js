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

router.post("/heartRate-record", verifyUser, addHeartRateRecords);
router.get("/heartRate-record", verifyUser, getAllHeartRateRecords);
router.get("/one-heartRate-record", verifyUser, getHeartRateRecord);
router.patch("/update-heartRate-record", verifyUser, updateHeartRateRecord);
router.delete("/heartRate-record", verifyUser, deleteAllHeartRateRecords);
router.delete("/one-heartRate-record", verifyUser, deleteHeartRateRecord);

module.exports = router;