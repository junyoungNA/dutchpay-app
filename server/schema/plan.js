const mongoose = require('mongoose');

const  planSchema= new mongoose.Schema({
    title : String,
    date: String,
    departure : String,
    arrive : String,
    startTime : String,
    endTime : String,
    content : String,
    idUser : String,
});

module.exports = mongoose.model('Plan', planSchema);