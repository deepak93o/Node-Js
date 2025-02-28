const fs = require("fs");

///////////Write a File

// fs.writeFileSync('./test.txt', 'Hey There !!');

//  fs.writeFile('./test.txt', 'Hey There!!', (err) => {})

    //////////Read a file

// const result = fs.readFileSync('./test.txt', 'utf-8');
// console.log(result);


// fs.readFile("./contact.txt","utf-8",(err,result) => {
//     if(err){
//         console.log("Error:" + err);        
//     }
//     else{
//         console.log(result);        
//     }
// });

///////Append file

// fs.appendFileSync("./test.txt", "Date = " + new Date().getDate().toLocaleString())

// fs.cpSync("./contact.txt", "./copy.html")

// fs.unlinkSync("./copy.html");

// console.log(fs.statSync('./contact.txt'))

// fs.mkdirSync("my-docs/a/b", { recursive: true});
// fs.rmdirSync("my-docs/a/b")
// fs.rmdirSync("my-docs/a")
// fs.rmdirSync("my-docs")