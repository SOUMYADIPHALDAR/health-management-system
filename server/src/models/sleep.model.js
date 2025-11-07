const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sleepSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    duration:{
        type: Number, // in hours
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
        enum:[1, 2, 3, 4, 5] // 1 is poor and 5 is excellent
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

// Automatically compute duration & mark completed if goal met
sleepSchema.pre("save", function (next) {
    if (this.sleepTime && this.wakeupTime) {
        const diff = this.wakeupTime - this.sleepTime;
        this.duration = Math.round(diff / (1000 * 60 * 60));
        this.completed = this.duration >= this.goal;
    }
});

// Add index for faster lookups
sleepSchema.index({ user: 1, date: 1 });

const Sleep = mongoose.model("Sleep", sleepSchema );
module.exports = Sleep
