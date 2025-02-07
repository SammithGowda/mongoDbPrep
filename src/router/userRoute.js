const express = require("express");
const {createUser, getUser} = require("../controller/userController");
const router = express.Router()

router.post('/create',createUser)
router.get('/',getUser)

module.exports = router;