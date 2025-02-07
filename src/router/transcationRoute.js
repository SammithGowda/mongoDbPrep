const express = require("express");
const { createTracnscation, getTranscation } = require("../controller/transcationController");
const router = express.Router()

router.post('/deposit',createTracnscation)
router.get('/',getTranscation)

module.exports = router;