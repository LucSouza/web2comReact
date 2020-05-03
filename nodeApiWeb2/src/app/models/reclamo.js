const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ReclamoSchema = new mongoose.Schema({
  queixa: {
    type: String,
    require: true,
  },
  descricao: {
    type: String,
    require: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    require: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Atendente',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reclamo = mongoose.model('Reclamo', ReclamoSchema);

module.exports = Reclamo;
