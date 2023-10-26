const express = require('express');
const router = express.Router();
const resultsCtrl = require('../controllers/results');


router.put('/:userID', resultsCtrl.addExternalScore);


module.exports = router;