const mongoose = require('mongoose')
const Schema = mongoose.Schema


const statSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    overall: {
        type: [Number],
        default: []
    },
    animals: {
        type: [Number],
        default: []
    },
    history: {
        type: [Number],
        default: []
    },
    sports: {
        type: [Number],
        default: []
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Stat', statSchema)