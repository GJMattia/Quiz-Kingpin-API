const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    },
    overall: {
        type: [Number],
        default: [100, 20, 40, 80]
    },
    animals: {
        type: [Number],
        default: [100, 60, 60]
    },
    history: {
        type: [Number],
        default: [60, 20, 60]
    },
    sports: {
        type: [Number],
        default: [100, 0, 60]
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password
            return ret
        }
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    return next()
})

module.exports = mongoose.model('User', userSchema)