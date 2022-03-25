const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
   
    type:{
        type:String,
        required: false
    },
    id_payer:{
        type:String,
        required: true
    },
    id_card:{
        type:String,
        required: false
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