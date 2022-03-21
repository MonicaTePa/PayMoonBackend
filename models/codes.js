const mongoose = require('mongoose');
const codes = mongoose.Schema({

  id_security: {
    type: Number,
    require: true
  },
  code: {
    type: Number,
    require: true
  },
  timestamp: {
    type: Date,
    require: true
  },
  status: {
    type: Boolean,
    require: true
  },
  id_transaction: {
    type: Number,
    require: true
  }

});
module.exports = mongoose.model('code', codes);
