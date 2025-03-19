const express = require('express');
// const users = require('./MOCK_DATA.json')
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
},
    { timestamps: true}
);

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
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

//Rest API
app
.route('/api/users/:id')
.get(async(req, res) => {
    const user = await User.findById(req.params.id);
    //http status
    if(!user) return res.status(404).json({error: "User not found"})
    return res.json(user);
})
.patch(async(req, res) => {
   await User.findByIdAndUpdate( req.params.id, { last_name: "Changed"});
   return res.json({ status: "Success"});
})
.delete(async(req, res) => {
    await User.findByIdAndDelete( req.params.id);
    return res.json({ status: "Success"});
});

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    // console.log(req.headers);
    // res.setHeader("X-myHeader", "Deepak");
    return res.json(allDbUsers);
});

app.post('/api/users', async (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.jobTitle){
        return res.status(400).json({msg: 'All fields are require'});
    }
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      jobTitle: body.jobTitle,
      gender: body.gender,
    });    
    return res.status(201).json({
      msg: "success"
    })
});


app.listen(PORT, () => console.log(`Server Started at ${PORT}`));