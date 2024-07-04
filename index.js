const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({path : "./.env"});
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api/auth" , authRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/", (req,res) => {
    res.send("server is running...");
});

mongoose.connect(URI)
.then(() => console.log(`connect to mongodb ${URI}`))
.catch((error) => console.log("get error",error));

app.listen(PORT, () => {
    console.log("connect to port",PORT)
});