const mongoose = require('mongoose');

const pocketSchema = mongoose.Schema({

    id_user: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0      
    },
    receptions: {
        type: Number,
        default: 0    
    },
    payments: {
        type: Number,
        default: 0    
    },
    deposits: {
        type: Number,
        default: 0    
    },
    former_balance:{
        type: Number,
        default:0
    },
    last_deposit:{
        type: Number,
        default:0     
    },
    date_cre: {
        type: Date,
        default: Date.now()
    }
}, 

);


module.exports = mongoose.model('pocket', pocketSchema)