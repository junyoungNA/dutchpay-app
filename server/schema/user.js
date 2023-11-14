const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accessToken: String,
    nickname: String,
    idUser : String,
    refreshToken:String,
});

module.exports = mongoose.model('User', userSchema);
    