const Question = require('../models/question');

module.exports = {
    create,
    index
};


async function index(req, res) {
    try {
        const userID = req.user._id;
        const questions = await Question.find({ user: userID });
        console.log(questions);
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions', error);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
}



async function create(req, res) {
    try {
        console.log('hello');
        const question = req.body;
        const newQuestion = await Question.create(question);
        res.json(newQuestion);
    } catch (error) {
        console.error('Error Creating question', error);
        res.status(500).json({ error: 'Failed to create question' })
    }
}