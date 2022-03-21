const mongoose = require('mongoose');

const depositSchema = mongoose.Schema({

    id_deposit:{
        type:String,
        required:true
    },
    id_user:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    id_card:{
        type:String,        
        required: true
    },
    amount:{
        type:Number,
        required:true
    },
    timestamp:{
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Deposit',depositSchema);