//const res = require('express/lib/response');
const Pocket = require('../models/Pocket.model');


exports.postPocket = async(req, res) => {
  try {
    let data_pocket;
    data_pocket = new Pocket(req.body);
    await data_pocket.save();
    res.send(data_pocket);
  } catch (error) {
      res.status(500).send('Ups...hubo un error');
  }
}

exports.getPocket = async(req, res) => {
  try {
    const data_pocket = await Pocket.findById(req.params.id);
    if(!data_pocket){
      res.status(404).send('Ups...no se encontro ningun elemento')
    }
    res.json(data_pocket)
  } catch (error){
      res.status(500).send('Ups...hubo un error')
  }
}

exports.getPockets = async(req,res) =>{
  try{
    const data = await Pocket.find();
    if(data.length === 0){
      res.send('No se encontraron bolsillos');
    }else{
      res.send(data)
    }
  }catch(error){
    res.status(500).send('Ups...hubo un error')
  }  
}

exports.putPocket = async(req, res) => {
  try{
    let data_pocket = await Pocket.findById(req.params.id);
    if(!data_pocket){
      res.status(404).send({ answer: "ERROR", message: "No hay coincidencias para atualizar" });
    }else{
      data_pocket = req.body;    
      data_pocket = await Pocket.findByIdAndUpdate({ _id: req.params.id }, data_pocket, { new: true });   
      res.send({ answer: "OK", message: "Bolsillo actualizado"
      });
    }
  }catch (error){
      res.status(500).send({ answer: "ERROR", message: "Error de sistema" });
  }
}

exports.deletePocket = async(req, res) => {
  try {
    let data_pocket = await Pocket.findByIdAndRemove({ _id: req.params.id })
    res.send({
      message: 'Eliminado satisfactoriamente', 
      data_pocket
    });
  } catch (error) {
      res.status(500).send('Ups..hubo un error');
  }
}

exports.getPocketByUserId = async(req,res) => {
  try{
    let user_pocket = await Pocket.findOne({id_user: req.params.id});
    if(user_pocket){
      res.send(user_pocket);
    }else{
      res.status(404).send({answer: "OK", message: "No se encontraron coincidencias"});
    }    
    // console.log(user_pocket);
  }catch(error){
    res.status(500).send({answer: "ERROR", message: "Error al consultar el bolsillo"});
    console.log(error)
  }
}