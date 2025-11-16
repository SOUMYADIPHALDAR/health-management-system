const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CaloriesBurnedSchema = new Schema({
    activity:{
        type: String,
        required: true
    },
    activityDuration:{
        type: Number,
        required: true

    },
    caloriesBurned :{
        type: Number,
        required: true,
        min: 0, //calories

    },
    date :{
         type: Date,
         default: Date.now
    },
    goal:{
        type: Number,
        default: 500 //kcal
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    completed: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const CaloriesBurned = mongoose.model("CaloriesBurned", CaloriesBurnedSchema);
module.exports = CaloriesBurned;