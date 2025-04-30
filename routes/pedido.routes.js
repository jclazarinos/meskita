const express = require('express');
const Pedido = require('../models/pedido');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const pedidos = await Pedido.find()
    .populate('mozo_id', 'nombre')
    .populate('items.plato_id', 'nombre precio');
  res.json(pedidos);
});

module.exports = router;
