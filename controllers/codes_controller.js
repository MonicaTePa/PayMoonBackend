const codes = require('../models/codes');


exports.agregarcodes = async (req, res) => {
  // console.log('Creando el producto desde el controlador');
  // console.log(req.body);

  try {
    let data_codes;
    data_codes = new codes(req.body);
    await data_codes.save();
    res.send(data_codes)

  } catch (error) {
    console.log(error);
    res.status(500).send('Ups... Hay un error, comuniquese con soporte');
  }
}

exports.vercodes = async (req, res) => {
  try {
    const data_codes = await codes.find();
    res.json(data_codes);

  } catch (error) {
    console.log(error);
    res.status(500).send('Ups... Hay un error, comuniquese con soporte');
  }
}

exports.vercode = async (req, res) => {
  try {
    const data_codes = await codes.findById(req.params.id);

    if (!data_codes) {
      res.status(404).json({
        mensaje: 'No se encontraron coincidencias'
      })
    }
    res.json(data_codes);

  } catch (error) {
    console.log(error);
    res.status(500).send('Ups... Hay un error, comuniquese con soporte');
  }
}
