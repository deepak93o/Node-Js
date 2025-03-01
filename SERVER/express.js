const http = require("http")
const express = require("express");

const app = express();

app.get('/', (req, res) => {
    return res.send("hello from Homepage")
});
app.get('/about', (req, res) => {
    return res.send(`Hello ${req.query.name}`);
});

app.listen(6969, () => console.log("Server started!"));