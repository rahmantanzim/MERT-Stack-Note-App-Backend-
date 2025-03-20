const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    number: {type: String, required: true},
})

module.exports = mongoose('User', UserSchema);