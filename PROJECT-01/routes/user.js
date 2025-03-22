const express = require('express');
const {getAllUSer, getUserById, updateUserById, deleteUserById, createNewUser} = require('../controller/user');

const router = express.Router();

//Routes

router.route("/").get(getAllUSer).post(createNewUser);
router
    .route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById);

module.exports = router;