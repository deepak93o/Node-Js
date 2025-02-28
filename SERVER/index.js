const http = require("http")
const fs = require("fs")

const myServer = http.createServer( (req, res) => {
    const log = `${Date.now()}:${req.url} New Request\n`;
    fs.appendFile('log.txt', log, (err,data) => {
        switch(req.url){
            case '/':
                res.end('Hello from server 1');
            break
            case '/about':
                res.end('I am Deepak Bhatt');
            break
            case '/login':
                res.end(`${Email}: xyx@gmail.com\n, ${Username}: deepak93o`);
            break
            default: res.end("404 Not Found");
        }
    });
});

myServer.listen(5000, () => console.log("Server Started!"));
