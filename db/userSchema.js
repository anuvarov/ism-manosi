const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        require: true
    },
    username: {
        type: String,
        require: true,
        default: '@username'
    },
    fullName: {
        type: String,
        require: true,
        default: 'firstName'
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    date: {
        type: String,
        default: Date.now()
    },
    step: {
        type: Number,
        default: 0,
    },
    photosId: {
        type: Array,
        default: [],
    }
});

const User = mongoose.model('User', UserSchema);

exports.User = User;