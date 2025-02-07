const express = require("express");
const {createUser, getUser, updateUser} = require("../controller/userController");
const router = express.Router()

router.post('/create',createUser)
router.patch('/update',updateUser)
router.get('/',getUser)

module.exports = router;