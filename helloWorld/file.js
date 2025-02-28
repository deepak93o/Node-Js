const fs = require("fs");

///////////Write a File

// fs.writeFileSync('./text.txt', 'Hey There !!');

// fs.writeFile('./text.txt', 'Hey There!!', (err) => {})

// const result = fs.readFileSync('./text.txt', 'utf-8');
// console.log(result);

//////////Read a file

// fs.readFile("./text.txt","utf-8",(err,result) => {
//     if(err){
//         console.log("Error:" + err);        
//     }
//     else{
//         console.log(result);        
//     }
// });

///////Append file

// fs.appendFileSync("./text.txt", new Date().getDate().toLocaleString())