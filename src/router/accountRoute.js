const express = require("express");
const { getAccount, createAccount } = require("../controller/accountController");
const router = express.Router()

router.get('/',getAccount)
router.post('/create',createAccount)

module.exports = router;