const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StepsSchema = new Schema({
    steps:{
        type: Number,
        require: true,
        min: 0,

    },
    date:{
        type: Number,
        default: Date.now
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
        ref: "User"
    }



}, {timestamps: true} );
const Step = mongoose.model("Step", StepsSchema);
module.exports = Step;