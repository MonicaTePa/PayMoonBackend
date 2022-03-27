const users= require('../models/users.js');
const User = require('../auth/auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';


 

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

    exports.createUser = (req, res, next) => {
        const newUser = {
          full_name: req.body.full_name,
          birth_date: req.body.birth_date,
          identification: req.body.identification,
          id_date: req.body.id_date,
          phone_number: req.body.phone_number,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password),
          timestamp: req.body.timestamp
        }
      
        User.create (newUser, (err, user) =>{
          if (err) return res.status(500).send('server error');
          const expiresIn = 24 * 60 * 60;
          const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
              expiresIn: expiresIn
            });
      
            const dataUser = {
              name: user.full_name,
              identification: user.identification,
              accessToken: accessToken,
              expiresIn: expiresIn
            }
      
          res.send({ dataUser });
        })
      }
      
      
 
 

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

