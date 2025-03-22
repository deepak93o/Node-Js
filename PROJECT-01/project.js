const express = require('express');
const users = require('./MOCK_DATA.json')
const mongoose = require('mongoose');
const fs = require("fs");
const app = express();
const PORT = 8000;

// Connection

mongoose.connect('mongodb+srv://deepak93o:45516111@cluster69.wicir.mongodb.net/newDb?retryWrites=true&w=majority&appName=Cluster69')
.then(() => console.log("✅ MongoDB Connected Successfully to Atlas!"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

//Schema

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
});

const User = mongoose.model('user', userSchema);

//Middleware
app.use(express.urlencoded({ extended: false}));
app.use((req, res, next) => {
    fs.appendFile('log.txt', `\n ${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,
    (err, data) => {
        next();
    });
});

//Routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

//Rest API
app
.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) =>  user.id === id);
    //http status
    if(!user) return res.status(404).json({error: "User not found"})
    return res.json(user);
})
.patch((req, res) => {
    return res.json({ status: "Pending"});
})
.delete((req, res) => {
    return res.json({ status: "Pending"})
});

app.get('/api/users', (req, res) => { 
    // console.log(req.headers);
    // res.setHeader("X-myHeader", "Deepak");
    return res.json(users);
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.Country){
        return res.status(400).json({msg: 'All fields are require'});
    }
    users.push({...body, id: users.length});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({status: "Success"});
    })
});


app.listen(PORT, () => console.log(`Server Started at ${PORT}`));