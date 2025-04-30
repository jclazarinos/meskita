const express = require('express');
const Plato = require('../models/plato');
const router = express.Router();

router.get('/', async (req, res) => {
  const platos = await Plato.find();
  res.json(platos);
});

router.post('/', async (req, res) => {
  try {
    const plato = new Plato(req.body);
    await plato.save();
    res.status(201).json(plato);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
