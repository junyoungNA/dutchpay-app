const mongoose = require('mongoose');

const  groupMembersSchema= new mongoose.Schema({
    idUser : String,
    groupName: String,
    groupMembers: [String],
    createdAt : String,
});

module.exports = mongoose.model('GroupMembers', groupMembersSchema);
    