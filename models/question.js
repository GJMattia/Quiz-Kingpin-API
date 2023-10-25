const mongoose = require('mongoose')
const Schema = mongoose.Schema


const questionSchema = new Schema({
    category: { type: String, required: true },
    question: { type: String, required: true, minLength: 10, maxLength: 50 },
    correct_answer: { type: String, required: true, minLength: 10, maxLength: 50 },
    incorrect_answers: { type: [String], required: true, minLength: 3, maxLength: 50 }

}, {
    timestamps: true
});




module.exports = mongoose.model('Question', questionSchema)