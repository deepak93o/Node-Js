const User = require('../models/user')

async function getAllUSer(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function getUserById(req, res) {
    const user = await User.findById(req.params.id);
    //http status
    if(!user) return res.status(404).json({error: "User not found"})
    return res.json(user);
}

async function updateUserById(req, res) {
    await User.findByIdAndUpdate( req.params.id, { last_name: "Changed"});
    return res.json({ status: "Success"});
}

async function deleteUserById (req, res) {
    await User.findByIdAndDelete( req.params.id);
    return res.json({ status: "Success"});
}

async function createNewUser(req, res) {
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
      msg: "success", id: result._id
    });
}
module.exports = {
    getAllUSer,
    getUserById,
    updateUserById,
    deleteUserById,
    createNewUser
}