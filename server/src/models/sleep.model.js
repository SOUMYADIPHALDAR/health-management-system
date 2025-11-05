const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sleepSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    duration:{
        type: Number,
        required: true,
        default: 0
    },
    sleepTime:{
        type: Date,
        
    },
    wakeupTime:{
        type: Date,
        
    },
    sleepQuality:{
        type: Number,
        enum:[1, 2, 3, 4, 5]
    },
    date:{
        type: Date,
        default: Date.now
    },
    goal:{
        type: Number,
        default: 8
    },
    completed:{
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const Sleep = mongoose.model("sleep", sleepSchema );
module.exports = Sleep
