const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StepsSchema = new Schema({
    steps:{
        type: Number,
        required: true,
        min: 0,
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    distance:{
        type: Number,
        default: 0

    },
    goal:{
        type: Number,
        default: 10000
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {timestamps: true} );

StepsSchema.index({ user: 1, date: 1 });

const Step = mongoose.model("Step", StepsSchema);
module.exports = Step;