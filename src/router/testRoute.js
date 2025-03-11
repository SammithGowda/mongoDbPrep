const express = require("express");
const { get, deletE, create } = require("../controller/testController");
const router = express.Router()

router.get('/',get)
router.post('/create',create)
router.delete('/delete',deletE)

module.exports = router;