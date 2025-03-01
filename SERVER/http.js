const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer( (req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New Request\n`;
    const myUrl = url.parse(req.url, true);
    fs.appendFile('log.txt', log, (err,data) => {
        switch(myUrl.pathname){
            case '/':
                res.end('Home Page');
            break
            // case '/about':
            //     const username = myUrl.query.name
            //     res.end(`Hi ${username}!`);
            // break
            case '/signup':
                res.end(`Email: xyx@gmail.com\nUsername: deepak93o`);
            break
            default: res.end("404 Not Found");
        }
    });
});

myServer.listen(5001, () => console.log("Server Started!"));
