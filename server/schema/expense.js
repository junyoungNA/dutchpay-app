const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    groupName: String,
    idUser : String,
    desc : String,
    date : String,
    amount : String,
    payer : String,
});

module.exports = mongoose.model('Expense', expenseSchema);
    