const express = require("express");
const { getAccount, createAccount,deleteAccount } = require("../controller/accountController");
const { createGender, getAndUpdateGender, deleteGender } = require("../controller/genderController");
const router = express.Router()

router.get('/',getAccount)
router.post('/create',createAccount)
router.delete('/delete',deleteAccount)
router.post('/gender/create',createGender)
router.put('/gender/update',getAndUpdateGender)
router.delete('/gender/delete',deleteGender)

module.exports = router;