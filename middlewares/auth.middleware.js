const jwt = require('jsonwebtoken');
// const UserModel = require('../models/users');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;   
    console.log(token);
    if(token){
        jwt.verify(token, 'secret_word', async (error, decodedToken) =>{
            if(error){
                console.log(error.message);
                res.json({answer:"ERROR", message: error.message })
            }else{
                console.log(decodedToken);
                return next();
            }
        });
    } else{
        res.json({answer: "ERROR", message: "No hay token"});
        console.log({answer: "ERROR", message: "No hay token"});
    }
}

const checkUser = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'secret_word', async (error, decodedToken) =>{
            if(error){
                console.log(error.message);
                res.json({answer:"ERROR", message: error.message })
            }else{
                console.log(decodedToken);
                const current_user = decodedToken.id;
                res.json({answer: "OK", user: current_user});
                return next();
            }
        });
    }
}

module.exports = {requireAuth, checkUser};