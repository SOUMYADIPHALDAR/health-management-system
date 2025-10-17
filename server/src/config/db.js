const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected successfully... ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection failed..", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;