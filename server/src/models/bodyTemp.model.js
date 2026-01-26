const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bodyTempSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    bodyTemp: {
        type: Number,
        default: 98,
        required: true
    },
    status:{
        type: String,
        enum: ["Normal", "Hypothermia", "Fever"],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const BodyTemp = mongoose.model("BodyTemp", bodyTempSchema);
module.exports = BodyTemp;