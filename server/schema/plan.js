const mongoose = require('mongoose');

const  planSchema= new mongoose.Schema({
    title : String,
    date: String,
    departure : String,
    arrive : String,
    stratTime : String,
    endTime : String,
    content : String,
});

module.exports = mongoose.model('Plan', planSchema);