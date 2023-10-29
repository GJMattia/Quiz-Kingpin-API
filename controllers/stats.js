const User = require('../models/user');
const Stat = require('../models/stat');

module.exports = {
    addExternalScore,
    createStatSheet,
    getUserStats,
    getAllStats,
    getSelectedStats
};

async function getSelectedStats(req, res) {
    try {
        const selectedID = req.params.selectedID;
        const stats = await Stat.findOne({ user: selectedID }).populate('user', 'name');
        res.json(stats);
    } catch (error) {
        console.error('error creating sheet', error)
    }
};


async function getAllStats(req, res) {
    try {
        const stats = await Stat.find({}).populate('user', 'name');
        res.json(stats);
    } catch (error) {
        console.error('error creating sheet', error)
    }
}

async function getUserStats(req, res) {
    try {
        const userID = req.user._id;
        const stats = await Stat.findOne({ user: userID });
        res.json(stats);
    } catch (error) {
        console.error('error creating sheet', error)
    }
}

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
        const stat = await Stat.findOne({ user: userID });
        stat[category].push(score);
        stat.overall.push(score);
        await stat.save();
        res.status(200).json({ message: 'Score added successfully' });

    } catch (error) {
        console.error('error adding score', error);
    }
};





