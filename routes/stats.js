const express = require('express');
const router = express.Router();
const statsCtrl = require('../controllers/stats');


router.get('/', statsCtrl.getAllStats);
router.post('/', statsCtrl.createStatSheet);

router.put('/:userID', statsCtrl.addExternalScore);


module.exports = router;