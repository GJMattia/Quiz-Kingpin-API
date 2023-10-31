const mongoose = require('mongoose')
const Schema = mongoose.Schema


const questionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    category: { type: String, required: true },
    question: { type: String, required: true, minLength: 1, maxLength: 80 },
    correct_answer: { type: String, required: true, minLength: 1, maxLength: 80 },
    incorrect_answers: { type: [String] },
    correct: { type: Number, default: 0 },
    incorrect: { type: Number, default: 0 }
}, {
    timestamps: true
});




module.exports = mongoose.model('Question', questionSchema)