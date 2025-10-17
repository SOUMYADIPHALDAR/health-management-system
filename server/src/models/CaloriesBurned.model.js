const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CaloriesBurnedSchema = new Schema({
    Activity:{
        type: String,
        require: true
    },
    ActivityDuration:{
        type: Number,
        require: true

    },
    CaloriesBurned :{
        type: Number,
        require: true,
        min: "1600", //calories

    },
    Date :{
         type: Number,
         default: Date.now
    },
    Goal:{
        type: Number,
        default: "2500" //kcal
    },

    User:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }



}, {timestamps: true});

const CaloriesBurned = mongoose.model("CaloriesBurned", CaloriesBurnedSchema);
module.exports = CaloriesBurned;