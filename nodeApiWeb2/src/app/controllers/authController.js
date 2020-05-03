const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');

const Atendente = require('../models/atendente');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if (await Atendente.findOne({ email }))
      return res.status(400).send({ error: 'Atendente already exists' });

    const atendente = await Atendente.create(req.body);

    atendente.password = undefined;

    return res.send({
      atendente,
      token: generateToken({ id: atendente.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const atendente = await Atendente.findOne({ email }).select('+password');

  if (!atendente)
    return res.status(400).send({ error: 'Atendente not found' });

  if (!await bcrypt.compare(password, atendente.password))
    return res.status(400).send({ error: 'Invalid password' });

  atendente.password = undefined;

  res.send({
    atendente,
    token: generateToken({ id: atendente.id }),
  });
});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const atendente = await Atendente.findOne({ email });

    if (!atendente)
      return res.status(400).send({ error: 'Atendente not found' });

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await Atendente.findByIdAndUpdate(atendente.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    });

    mailer.sendMail({
      to: email,
      from: 'admin@fean.com.br',
      template: 'auth/forgot_password',
      context: { token },
    }, (err) => {
      if (err)
        
        return res.status(400).send({ error: 'Cannot send forgot password email' });
        console.log(err);
      return res.send();
    })
  } catch (err) {
   
    res.status(400).send({ error: 'Error on forgot password, try again' });
  }
});

router.post('/reset_password', async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const atendente = await Atendente.findOne({ email })
      .select('+passwordResetToken passwordResetExpires');

    if (!atendente)
      return res.status(400).send({ error: 'Atendente not found' });

    if (token !== atendente.passwordResetToken)
      return res.status(400).send({ error: 'Token invalid' });

    const now = new Date();

    if (now > atendente.passwordResetExpires)
      return res.status(400).send({ error: 'Token expired, generate a new one' });

    atendente.password = password;

    await atendente.save();

    res.send();
  } catch (err) {
    res.status(400).send({ error: 'Cannot reset password, try again' });
  }
});

module.exports = app => app.use('/auth', router);
