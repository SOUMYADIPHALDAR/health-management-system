const mongoose = require("mongoose");
const Schema = mongoose.Schema
const waterIntakeSchema = new Schema({
    User:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    intake:{
        type: Number,
        require: true,
        default: 0
    },
    Date:{
        type: Number,
        default: Date.now
    },
    Goal:{
        type: Number,
        default: 5
    },
    Completed:{
        type: Boolean,
        default: false
    }


}, {timestamps: true})
const waterIntake = mongoose.model("waterIntake", waterIntakeSchema);
module.exports = waterIntake;