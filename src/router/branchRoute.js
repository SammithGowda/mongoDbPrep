const express = require("express");
const { createBranch, getBranch, removeBranch } = require("../controller/branchController");
const router = express.Router()

router.get('/',getBranch)
router.post('/create',createBranch)
router.delete('/remove/:branchId',removeBranch)

module.exports = router;