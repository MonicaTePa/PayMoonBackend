const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    id_transaction: {
        type: String,
        required: false
    },    
    type:{
        type:String,
        required: true
    },
    id_payer:{
        type:String,
        required: true
    },
    id_card:{
        type:String,
        required: true
    },
    id_receiver:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Transaction',transactionSchema);