const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ClienteSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cpf: {
    type: String,
    require: true,
  },
  atendente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Atendente',
    require: true,
  },
  reclamos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reclamo',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;
