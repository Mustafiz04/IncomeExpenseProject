const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema({
    // id : 1, type : 'Income', amount : 100, category : "Salary", date:'10-10-2000'
    type : {
        type : String
    },
    category : {
        type : String
    },
    amount : {
        type : Number
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("TransactionList", TransactionSchema);