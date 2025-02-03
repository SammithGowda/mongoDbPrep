const express = require("express");
const createUser = require("../controller/userController");
const router = express.Router()

router.get('/',createUser)

module.exports = router;