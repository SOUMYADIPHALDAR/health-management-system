const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const heartRateSchema = new Schema({
    User:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    heartRate:{
        type: Number,
        required: true,
        min: 30,
        max: 220
    },
    Status:{
        type: String,
        enum: ["low", "normal", "high"],
        default: "normal"
   },
   Date:{
    type: Date,
    default: Date.now
   }

},{timstamps: true});
const heartRate = mongoose.model("heartRate", heartRateSchema);
module.exports = heartRate;