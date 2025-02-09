const express = require("express");
const {createUser, getUser, updateUser, deleteUser, getUserAndAccount} = require("../controller/userController");
const router = express.Router()

router.get('/',getUser)
router.post('/create',createUser)
router.patch('/update',updateUser)
router.delete('/delete/:userId',deleteUser)
router.get('/userDeatils/:userId',getUserAndAccount)

module.exports = router;