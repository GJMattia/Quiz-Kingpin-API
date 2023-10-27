const express = require('express');
const router = express.Router();
const questionsCtrl = require('../controllers/questions');


router.get('/', questionsCtrl.index);

router.get('/:category', questionsCtrl.getSet);

router.post('/', questionsCtrl.create);

router.delete('/:questionID', questionsCtrl.delete);

router.put('/:questionID', questionsCtrl.updateQuestion);

router.put('/:questionID/correct', questionsCtrl.markQuestionCorrect);

router.put('/:questionID/incorrect', questionsCtrl.markQuestionIncorrect);


module.exports = router;