const express = require('express');
const users = require('./MOCK_DATA.json')
const fs = require("fs");
const app = express();
const PORT = 8000;
//Middleware
app.use(express.urlencoded({ extended: false}));

app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app
.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) =>  user.id === id);
    return res.json(user);
})
.patch((req, res) => {
    return res.json({ status: "Pending"});
})
.delete((req, res) => {
    return res.json({ status: "Pending"})
});

app.get('/api/users', (req, res) => {    
    return res.json(users);
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json(`{status: "Success"\n id: ${id}}`);
    })
});


app.listen(PORT, () => console.log(`Server Started at ${PORT}`));