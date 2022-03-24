const mongoose= require('mongoose');

const users = mongoose.Schema({

    full_name:{
        type: String,
        required: true
    },
    identification:{
        type: String,
        required: true
    },   
    
    birth_date:{
        type: Date,
        required: true
    },

    id_date:{
        type: Date,
        required: true
    },
    phone_number:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now()
    }    
}); 

 
module.exports= mongoose.model('users', users)


