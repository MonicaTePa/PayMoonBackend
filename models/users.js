const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

const users = mongoose.Schema({

    full_name:{
        type: String,
        required: true,
        uppercase: true
    },
    identification:{
        type: String,
        required: true,
        unique: true
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
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        lowercase: true
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
 
users.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

users.statics.login = async function(identification, password){
    const user = await this.findOne({identification: identification});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth === true){
            return user
        }else {return false}         
                
    } else {return "Incorrect identification"}
}

module.exports= mongoose.model('users', users)


