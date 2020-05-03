const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Cliente = require('../models/cliente');
const Reclamo = require('../models/reclamo');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();

    return res.send({ clientes });

  } catch (err) {
    return res.status(400).send({ error: 'Error loading clientes' });
  }
});

router.get('/:clienteId', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.clienteId);

    return res.send({ cliente });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading cliente' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, cpf } = req.body;
    
    const cliente = await Cliente.create({ name, cpf, atendente: req.atendenteId });

    await cliente.save();

    return res.send({ cliente });

  } catch (err) {
    
    return res.status(400).send({ error: 'Error creating new cliente' });
  }
});

router.put('/:clienteId', async (req, res) => {
  try {
    const { name, cpf, reclamos } = req.body;

    const cliente = await Cliente.findByIdAndUpdate(req.params.clienteId, {
      name,
      cpf
    }, { new: true });

    cliente.reclamos = [];
    await Reclamo.remove({ cliente: cliente._id });

    await Promise.all(reclamos.map(async reclamo => {
      const clienteReclamo = new Reclamo({ ...reclamo, cliente: cliente._id });

      await clienteReclamo.save();

      cliente.reclamos.push(clienteReclamo);
    }));

    await cliente.save();

    return res.send({ cliente });
  } catch (err) {
    return res.status(400).send({ error: 'Error updating cliente' });
  }
});

router.delete('/:clienteId', async (req, res) => {
  try {
    await Cliente.findByIdAndRemove(req.params.clienteId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error deleting cliente' });
  }
});

module.exports = app => app.use('/clientes', router);
