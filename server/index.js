const express = require("express");
require("dotenv").config();
const connectDB = require("./src/config/db.js");

const app = express();
const port = process.env.PORT || 5000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`server is running at http://localhost:${port}`);
    })
})
.catch((error) => {
    console.log("MongoDb connection lost..!!", error.message);
})