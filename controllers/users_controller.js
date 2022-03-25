const users= require('../models/users.js');

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
    }
},
exports.putusers = async(req, res) => {
    try {
        const { full_name, identification, birth_date, number, email, password, id_cards} = req.body
        let data= await users.findById(req.params.id);

        if (!data) {
            res.status(404).json({ mensaje: 'No se encontraron coincidencias para la actualización de datos' })
        }

        data.full_name = full_name;
        data.identification = identification;
        data.birth_date = birth_date;
        data.number = number;
        data.email = email;
        data.password = password;
        data.id_cards = id_cards;
           
    

        data = await users.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups... Hay un error, comuniquese con soporte');
    }
}


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

