const mongoose = require('mongoose');

const pocketSchema = mongoose.Schema({
  id_pocket: {
      type: String,
      require: true
  },
  id_user: {
      type: String,
      require: true
  },
  balance: {
      type: Number,
      require: true
  },
  receptions: {
      type: Number,
      require: true
  },
  payments: {
      type: Number,
      require: true,
  },
  deposits: {
      type: Number,
      require: true
  },
  date_cre: {
      type: Date,
      default: Date.now()
  }
})


module.exports = mongoose.model('pocket', pocketSchema)