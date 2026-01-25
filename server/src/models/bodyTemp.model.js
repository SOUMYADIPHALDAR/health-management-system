const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bodyTempSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    temparature: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const BodyTemp = mongoose.model("BodyTemp", bodyTempSchema);
module.exports = BodyTemp;