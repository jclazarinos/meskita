const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');

// Obtener todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('mozo_id').populate('items.plato_id');
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener pedido por ID
router.get('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate('mozo_id').populate('items.plato_id');
    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo pedido
router.post('/', async (req, res) => {
  try {
    const nuevo = new Pedido(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar pedido
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar pedido
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Pedido.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
