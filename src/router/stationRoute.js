const express = require("express");
const { createStation, getEvenStation } = require("../controller/stationController");
const { createOccupation, getOccupation, getOccupationCount } = require("../controller/occupationController");
const router = express.Router()

router.get('/getStation',getEvenStation)
router.post('/create',createStation)
router.post('/create/occupation',createOccupation)
router.get('/getalloccupant',getOccupation)
router.get('/getalloccupantcount',getOccupationCount)

module.exports = router;