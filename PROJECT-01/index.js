const express = require('express');
const mongoose = require('mongoose');
const app = express();

const { logReqRes } = require("./middlewares")
const userRoutes = require("./routes/user")
const {connectMongoDb} = require('./connection')

const PORT = 8000;

// Connection
connectMongoDb("mongodb+srv://deepak93o:45516111@cluster69.wicir.mongodb.net/newDb?retryWrites=true&w=majority&appName=Cluster69")
.then(() => console.log("✅ MongoDB Connected Successfully to Atlas!"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

//Middleware
app.use(express.urlencoded({ extended: false}));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));