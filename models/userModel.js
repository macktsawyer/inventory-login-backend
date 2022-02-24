const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { collection: 'Users' })

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel