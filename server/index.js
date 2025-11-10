const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db.js");
const UserRouter = require("./src/routers/user.route.js");
const StepRouter = require("./src/routers/steps.route.js");
const SleepRouter = require("./src/routers/sleep.route.js");

const app = express();
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extendeda: true}));
app.use(cors());
app.use("/", UserRouter);
app.use("/", StepRouter);
app.use("/", SleepRouter);

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`server is running at http://localhost:${port}`);
    })
})
.catch((error) => {
    console.log("MongoDb connection lost..!!", error.message);
})