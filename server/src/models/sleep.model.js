const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sleepSchema = new Schema({
    User:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    Duration:{
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
    sleppQuality:{
        type: Number,
        enum:[1, 2, 3, 4, 5]
    },
    Date:{
        type: Date,
        default: Date.now
    },
    Goal:{
        type: Number,
        default: 8
    },
    Completed:{
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const Sleep = mongoose.model("sleep", sleepSchema );
module.exports = Sleep