const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const heartRateSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    heartRate: {
      type: Number,
      required: true,
      min: 30,
      max: 220,
    },
    status: {
      type: String,
      enum: ["low", "normal", "high"],
      default: "normal",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timstamps: true }
);

heartRateSchema.pre("save", function(next) {
    if (this.heartRate < 60) {
        this.status = "low"
    } else if (this.heartRate > 100) {
        this.status = "high"
    } else {
        this.status = "normal"
    }
    next()
});

const HeartRate = mongoose.model("HeartRate", heartRateSchema);

module.exports = HeartRate;