const mongoose = require('mongoose');

const  groupMembersSchema= new mongoose.Schema({
    idUser : String,
    groupName: String,
    groupMembers: [String],
});

module.exports = mongoose.model('GroupMembers', groupMembersSchema);
    