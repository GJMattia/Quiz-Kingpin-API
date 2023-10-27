const User = require('../models/user');
const Stat = require('../models/stat');

module.exports = {
    addExternalScore,
    createStatSheet
};

async function createStatSheet(req, res) {
    try {
        const userID = req.body.userID;


        const newStat = await Stat.create({ user: userID });
        res.json(newStat);
    } catch (error) {
        console.error('error creating sheet', error)
    }
};


async function addExternalScore(req, res) {
    try {
        const userID = req.params.userID;
        const category = req.body.category.toLowerCase();
        const score = req.body.score;
        const user = await User.findById(userID);
        user[category].push(score);
        await user.save();
        res.status(200).json({ message: 'Score added successfully' });
    } catch (error) {
        console.error('error adding score', error);
    }
};