const fs = require("fs");

function logReqRes(filename){
    return (req, res, next) => {
    fs.appendFile(filename, `\n ${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,
    (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        }
        next();
    });
    }
}

module.exports = {
    logReqRes,
}