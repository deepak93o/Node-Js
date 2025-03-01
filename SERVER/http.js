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
                if(req.method === 'GET'){
                    res.end("SignUp page");
                } else if(req.method === 'POST'){
                    res.end("Form submitted");
                }
            break
            default: res.end("404 Not Found");
        }
    });
});

myServer.listen(9090, () => console.log("Server Started!"));
