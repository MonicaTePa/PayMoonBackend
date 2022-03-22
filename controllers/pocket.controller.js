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

exports.putPocket = async(req, res) => {
  try {
    const { id_pocket, id_user, balance, receptions, payments, deposits } = req.body;
    let data_pocket = await Pocket.findById(req.params.id);
    if(!data_pocket){
      res.status(404).send('Ups...no se encontro ningun elemento');
    }

    data_pocket.id_pocket = id_pocket;
    data_pocket.id_user = id_user;
    data_pocket.balance = balance;
    data_pocket.receptions = receptions;
    data_pocket.payments = payments;
    data_pocket.deposits = deposits;

    data_pocket = await Pocket.findByIdAndUpdate({ _id: req.params.id }, data_pocket, { new: true });
    res.json(data_pocket);

  } catch (error) {
      res.status(500).send('Ups...huno un problema');
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