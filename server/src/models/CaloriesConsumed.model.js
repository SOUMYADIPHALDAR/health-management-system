const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CaloriesConsumedSchema = new Schema({
    User:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    CalorieType:{
        type: String,
        enum: [Protien, fat, carbs, fibere],
        require: true
    },
    CaloriesConsumed:{
        type: Number,
        require: true,
        min: 1500 // kcal
    },
    Goal:{
        type: Number,
        default: 2000 // kcal
    },
    Date:{
        type: Number,
        default: Date.now

    }
}, {timestamps: true});

const CaloriesConsumed = mongoose.model("CaloriesConsumed", "CaloriesConsumedSchema");
const exports = CaloriesConsumed;