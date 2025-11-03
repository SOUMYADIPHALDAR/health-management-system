const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StepsSchema = new Schema({
    Steps:{
        type: Number,
        require: true,
        min: 0,

    },
    Date:{
        type: Number,
        default: Date.now
    },
    Distance:{
        type: Number,
        default: 0

    },
    Goal:{
        type: Number,
        default: 10000
    },
    User:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }



}, {timestamps: true} );
const Step = mongoose.model("Step", StepsSchema);
module.exports = Step;