const express = require("express");
const router = express.Router();
const {
    addSleep,
    getSleepRecord,
    getAllSleepRecords,
    updateSleepRecords,
    deleteOneSleepRecord,
    deleteAllSleepRecords
} = require("../controllers/sleep.controller.js");
const verifyUser = require("../middlewares/user.middleware.js");

router.post("/sleep", verifyUser, addSleep);
router.get("/sleep/:sleepId", verifyUser, getSleepRecord);
router.get("/sleep", verifyUser, getAllSleepRecords);
router.patch("/sleep/:sleepId", verifyUser, updateSleepRecords);
router.delete("/sleep/:sleepId", verifyUser, deleteOneSleepRecord);
router.delete("/sleep", verifyUser, deleteAllSleepRecords);

module.exports = router;