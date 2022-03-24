const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({

  id_user:{
    type: String,
    required: true
  },    
  card_number: {
    type: String,
    required: true
  },
  card_type: {
    type: String,
    required: true
  },
  expiration_date: {
    type: Date,
    required: true
  },
  cvc: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postal_code: {
    type: String,
    required: true
  },
  card_name: {
    type: String,
    required: true
  }, 
  timestamp: {
    type: Date,
    default: Date.now()

  }

});

module.exports = mongoose.model('Cards', cardSchema);
