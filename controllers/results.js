const User = require('../models/user');

module.exports = {
    addExternalScore
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