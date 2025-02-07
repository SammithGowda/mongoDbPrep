const express = require("express");
const {createUser, getUser, updateUser, deleteUser} = require("../controller/userController");
const router = express.Router()

router.get('/',getUser)
router.post('/create',createUser)
router.patch('/update',updateUser)
router.delete('/delete/:userId',deleteUser)

module.exports = router;