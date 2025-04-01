const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require('./connect');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb+srv://deepak93o:45516111@cluster69.wicir.mongodb.net/short-url?retryWrites=true&w=majority&appName=Cluster69")
.then(() => console.log("✅ MongoDB Connected Successfully to Atlas!"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

//EJS
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"))

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home');
})


app.use(express.json());
app.use("/url", urlRoute );

app.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`));