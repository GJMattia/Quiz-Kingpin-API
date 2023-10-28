const Question = require('../models/question');

module.exports = {
    create,
    index,
    delete: deleteQuestion,
    updateQuestion,
    getSet,
    markQuestionCorrect,
    markQuestionIncorrect
};

async function markQuestionIncorrect(req, res) {
    try {
        const questionID = req.params.questionID;
        const question = await Question.findById(questionID);
        question.correct = question.incorrect += 1;
        await question.save();
    } catch (error) {
        console.error('Error updating question', error);
        res.status(500).json({ error: 'Failed to update question' });
    }
};

async function markQuestionCorrect(req, res) {
    try {
        const questionID = req.params.questionID;
        const question = await Question.findById(questionID);
        question.correct = question.correct += 1;
        await question.save();
    } catch (error) {
        console.error('Error updating question', error);
        res.status(500).json({ error: 'Failed to update question' });
    }
};

async function getSet(req, res) {
    try {
        let category = req.params.category;
        const userID = req.user._id;
        const questions = await Question.aggregate([
            { $match: { category: category } },
            { $sample: { size: 5 } }
        ]);

        res.json(questions);

    } catch (error) {
        console.error('Error updating question', error);
        res.status(500).json({ error: 'Failed to update question' });
    }
}

async function updateQuestion(req, res) {
    try {
        const questionID = req.params.questionID;
        const updatedQuestion = req.body;

        const updatedQuestionDocument = await Question.findByIdAndUpdate(
            questionID,
            updatedQuestion,
        );
        res.status(200).json(updatedQuestionDocument);
    } catch (error) {
        console.error('Error updating question', error);
        res.status(500).json({ error: 'Failed to update question' });
    }
}


async function deleteQuestion(req, res) {
    try {
        const questionID = req.params.questionID;
        await Question.findByIdAndDelete(questionID);
        res.json({ message: 'question deleted successfully' })
    } catch (error) {
        console.error('Error deleting note', error);
        res.status(500).json({ error: 'Failed to delete question' })
    }
}

async function index(req, res) {
    try {
        const userID = req.user._id;
        const questions = await Question.find({ user: userID });
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions', error);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
}



async function create(req, res) {
    try {
        const question = req.body;
        const newQuestion = await Question.create(question);
        res.json(newQuestion);
    } catch (error) {
        console.error('Error Creating question', error);
        res.status(500).json({ error: 'Failed to create question' })
    }
}