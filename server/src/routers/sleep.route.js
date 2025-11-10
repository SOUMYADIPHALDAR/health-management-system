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
const { mkcol } = require("./steps.route");

router.post("/sleep", verifyUser, addSleep);
router.get("/sleep", verifyUser, getSleepRecord);
router.get("/all-sleepRecord", verifyUser, getAllSleepRecords);
router.patch("/update-sleepRecord", verifyUser, updateSleepRecords);
router.delete("/delete-sleepRecord", verifyUser, deleteOneSleepRecord);
router.delete("/delete-all-sleepRecords", verifyUser, deleteAllSleepRecords);

module.exports = router;