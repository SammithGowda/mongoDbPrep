const express = require("express");
const { get, deletE, create, addCityName } = require("../controller/testController");
const router = express.Router()

router.get('/',get)
router.post('/create',create)
router.delete('/delete',deletE)
router.post('/city',addCityName)

module.exports = router;