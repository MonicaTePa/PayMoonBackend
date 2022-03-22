const mongoose= require('mongoose');

const users = mongoose.Schema({

full_name:{
type: String,
require: true
},
identification:{
type: Number,
require: true
},
birth_date:{
type: Date,
require: true
},
number:{
type: Number,
require: true
},
email:{
type: String,
require: true
},
password:{
type: String,
require: true
} 
 
});
 
 
module.exports= mongoose.model('users', users)


