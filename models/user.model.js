const mongoose = require('mongoose');
const { roleArrays } = require('../global/constants');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: roleArrays,
            default: 'member'
        },
        ratingsCount: {
            type: Number,
            default: 0
        },
        ratingsAverage: {
            type: Number,
            default: 0,
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);