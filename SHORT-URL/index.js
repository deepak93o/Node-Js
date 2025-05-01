const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter")
const app = express();
const PORT = 8001;

connectToMongoDB(
  "mongodb+srv://deepak93o:45516111@cluster69.wicir.mongodb.net/short-url?retryWrites=true&w=majority&appName=Cluster69"
)
  .then(() => console.log("✅ MongoDB Connected Successfully to Atlas!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

//EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls : allUrls,
//   });
// });

// //////

// app.get("/test", async(req, res) => {
//     const allUrls = await URL.find({});
//   return res.end(
//     `
//     <html lang="en">
//     <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Hoem Page</title>
//     </head>
//     <body>
//     <h1>Hello NodeJs</h1>
//     <ol>
//        ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectUrl} - ${url.visitHistory.length}</li>`).join('')} 
//     </ol>
//     </body>
//     </html>
//     `
//   );
// });

app.use(express.json());

app.use(express.urlencoded({ extended: false}));

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`));
