const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CaloriesConsumedSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    calorieType:{
        type: String,
        enum: ["Protien", "fat", "carbs", "fibere"],
        required: true
    },
    caloriesConsumed:{
        type: Number,
        required: true,
        min:0 // kcal
    },
    goal:{
        type: Number,
        default: 2000 // kcal
    },
    date:{
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const CaloriesConsumed = mongoose.model("CaloriesConsumed", CaloriesConsumedSchema);
module.exports = CaloriesConsumed;