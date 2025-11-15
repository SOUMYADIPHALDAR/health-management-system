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
router.get("/sleep/:sleepId", verifyUser, getAllSleepRecords);
router.patch("/sleep/:sleepId", verifyUser, updateSleepRecords);
router.delete("/sleep/:sleepId", verifyUser, deleteOneSleepRecord);
router.delete("/sleep", verifyUser, deleteAllSleepRecords);

module.exports = router;