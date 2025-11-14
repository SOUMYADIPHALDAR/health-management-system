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

router.post("/calorieBurned-record", verifyUser, addCalorieBurnedRecords);
router.get("/calorieBurned-record", verifyUser, getAllCalorieBurnedRecords);
router.get("/one-calorieBurned-record", verifyUser, getCalorieBurnedRecord);
router.patch("/update-calorieBurned-record", verifyUser, updateCalorieBurnedRecords);
router.delete("/calorieBurned-record", verifyUser, deleteAllCalorieBurnedRecord);
router.delete("/one-calorieBurned-record", verifyUser, deleteCalorieBurnedRecord);

module.exports = router;