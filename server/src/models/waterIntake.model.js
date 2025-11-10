const mongoose = require("mongoose");
const Schema = mongoose.Schema
const waterIntakeSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    intake:{
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    date:{
        type: Date,
        default: Date.now
    },
    goal:{
        type: Number,
        default: 5,
        min: 0
    },
    completed:{
        type: Boolean,
        default: false
    }


}, {timestamps: true})
const WaterIntake = mongoose.model("WaterIntake", waterIntakeSchema);
module.exports = WaterIntake;