const users= require('../models/users.js');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const TOKEN_SECRET = require('../.env');
dotenv.config();

 
//Esquema del registro
const schemaRegister = Joi.object({
    full_name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    identification: Joi.number().required(),
    phone_number: Joi.number().required(),
    birth_date: Joi.date().required(),
    timestamp: Joi.date().required()
})

// Esquema del login
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})


exports.getusers = async(req, res) => {
 try {
 let data;
 data= await users.find();
 res.json(data);
 }
 
 catch(error){
 console.log(error);
 res.status(500).send('ups.. hubo un error, contacte al administrador');
 
 }
}

exports.getuserbyid = async(req,res) => {
     try{
         let data = await users.findById(req.params.id);
         res.send(data)
     }catch(error){
        console.log(error);
        res.status(500).send('ups.. hubo un error, contacte al administrador');
    }
}


exports.getUserByPhone = async(req,res) =>{
    try{
        const user = await users.findOne({phone_number: req.params.pn}).exec();
        if(user){
            res.send(user._id);
        }else{
            res.send({message: "El usuario no existe"});
        }
    }catch(error){
        console.log(error);
        res.status(500).send({message: "Hubo un error"});
    }
    }

exports.login = async(req, res) => {
 
  try{

    // Validaciones de login
    const { error } = schemaLogin.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})
    
    // Validaciond e existencia
    const user = await users.findOne({email: req.body.email})
    if(!user) return res.status(400).json({error: 'Usuario no encontrado'})

    // Validacion de password en la base de datos
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json({error: 'Constraseña invalida'})

    // Creando token
    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, process.env.TOKEN_SECRET)
    
    // Colocando el token en el header y el cuerpo de la respuesta
    res.header('auth-token', token).json({
        error: null,
        data: { token },
        message: 'Bienvenido'
    }) /*
    if (req.body) {
    var user = req.body;
    console.log(user)
    const info = await users.findOne({email: req.body.email})
    const validPassword = await bcrypt.compare(req.body.password, info.password)
    console.log(validPassword)
    if (users.email===user.email && users.password === req.body.password) {
      var token = jwt.sign(user, JWT_Secret);
      res.status(200).send({
        signed_user: user,
        token: token
      });
    } else {
      res.status(403).send({
        errorMessage: 'Authorisation required!'
      });
    }
  } else {
    res.status(403).send({
      errorMessage: 'Please provide email and password'
    });
  } */
    }
    catch(error){
console.log(error);

res.status(500).send('ups.. hubo un error, contacte al administrador');
}


},
 
 
 
exports.postusers= async(req,res) =>{
/*
try{
let data;
data=new users(req.body);
await data.save();
res.send(data)

}

exports.postusers= async(req,res) =>{

try{
    const user1 = await users.findOne({identification:req.body.identification}).exec();
    const user2 = await users.findOne({phone_number:req.body.phone_number}).exec();
    const user3 = await users.findOne({email:req.body.email}).exec();


    if(user1){
        res.send({message: "Identificación ya registrada"});
    }else if(user2){
        res.send({message: "Teléfono ya registrado"});
    }else if(user3){
        res.send({message: "Correo ya registrado"});
    }else{
        let data;
        data=new users(req.body);
        await data.save();
        res.send(data)
    }
} catch(error){
        console.log(error);
        res.status(500).send({message: "Hubo un error"});

},*/

    
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }

    const isEmailExist = await users.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new users({
        full_name: req.body.full_name,
        identification: req.body.identification,
        birth_date: req.body.birth_date,
        phone_number: req.body.phone_number,
        email: req.body.email,
        password: password,
        timestamp: req.body.timestamp
    });
    try {
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})

    }
},

exports.putusers = async(req, res) => {
    try {
        const { full_name, identification, birth_date, phone_number, email, password, id_date} = req.body
        let data= await users.findById(req.params.id);

        if (!data) {
            res.status(404).json({ mensaje: 'No se encontraron coincidencias para la actualización de datos' })
        }

        data.full_name = full_name;
        data.identification = identification;
        data.birth_date = birth_date;
        data.number = phone_number;
        data.email = email;
        data.password = password;
        data.id_date = id_date;
           
    

        await users.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
        res.send({message: "Actualización exitosa"})

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
    },

 exports.deleteusers = async(req,res) =>{
        try{
            const result = await users.findById(req.params.id);
            if(result){
                await users.findByIdAndRemove(req.params.id);
                res.send({
                    message: "Usuario eliminado"
                });
            }else{
                res.status(404).send({
                    message: "No hay coincidencias para eliminar"
                });
            }
        }catch(error){
            console.log(error);
            res.status(500).send({
                message: "Error al hacer la eliminación"
            });
        }
    }

