const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');

const maxAge = 3*24*60*60 //Time in seconds for jwt (3 days)
const createToken = (id) =>{
    return jwt.sign({id}, 'secret_word', {
        expiresIn: maxAge
    });
}

module.exports.signup_post = async (req,res) =>{
    const userData = req.body;
    try{
    const user1 = await UserModel.findOne({identification:req.body.identification}).exec();
    const user2 = await UserModel.findOne({phone_number:req.body.phone_number}).exec();
    const user3 = await UserModel.findOne({email:req.body.email}).exec();

    if(user1){
        res.send({
            answer: "OK", 
            code: 1,
            message: "Identificación ya registrada"
        });
    }else if(user2){
        res.send({
            answer: "OK", 
            code: 2,
            message: "Teléfono ya registrado"
        });
    }else if(user3){        
        res.send({
            answer: "OK", 
            code: 3,
            message: "Correo ya registrado"});
    }else{
        // let data;
        // data=new users(req.body);
        // await data.save();
        // res.send(data);    
        const newUser = await UserModel.create(userData);
        res.status(201).send(newUser);       
    }
        
    }catch(error){
        res.status(500).send({answer: "ERROR", message: "Usuario no creado"});
        console.log(error);
    }
    // res.send("signup post");
}

module.exports.login_post = async (req,res) =>{
    // res.send("login post");    
    const {identification, password} = req.body;
    try{
        const user1 = await UserModel.findOne({identification: identification});
        if(user1){
            // res.json({identification,password});
            const user = await UserModel.login(identification,password);
            if(user){
                const token = createToken(user._id);
                res.json({user: user._id, token: token});                            
            }else{
                res.json({answer: "ERROR", code: 2, message: "Contraseña incorrecta"});    
            }
        }else{
            res.json({answer: "ERROR", code: 1, message: "Usuario no registrado"});            
        }
    }catch(error){
        res.status(500).send({answer: "ERROR", message: "Usuario no creado"});
        console.log(error);
    }   
      
}


module.exports.checkUser = async (req,res) =>{
    const token = req.cookies.jwt;
    try{
        const reqUser = await UserModel.findById(req.params.id);
        console.log(reqUser,  token);
        if(token){
            jwt.verify(token, 'secret_word', async (error, decodedToken) =>{
                if(error){
                    console.log(error.message);
                    res.json({answer:"ERROR", message: error.message })
                }else{
                    console.log(decodedToken);
                    const current_user = decodedToken.id;                    
                    if(reqUser._id.toString() === current_user){
                        
                        res.json({answer: "OK"});   
                    }else{
                        res.json({answer: "ERROR", message: "Los usuarios no coinciden"}); 
                    }                                    
                }
            });
        }
        // res.json( {answer: "OK", data: {user: reqUser, token: token} });
    }catch(error){
        res.status(500).json({answer:"ERROR", message: error.message })
        console.log(error)
    }
   
}

module.exports.logout = (req,res) =>{
    res.send("logout get");
}