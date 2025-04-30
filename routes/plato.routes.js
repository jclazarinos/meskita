const express = require('express');
const router = express.Router();
const Plato = require('../models/plato');

// Obtener todos los platos
router.get('/', async (req, res) => {
  try {
    const platos = await Plato.find();
    res.json(platos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un plato por ID
router.get('/:id', async (req, res) => {
  try {
    const plato = await Plato.findById(req.params.id);
    if (!plato) return res.status(404).json({ message: 'Plato no encontrado' });
    res.json(plato);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo plato
router.post('/', async (req, res) => {
  try {
    const nuevo = new Plato(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar plato
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Plato.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ message: 'Plato no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar plato
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Plato.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: 'Plato no encontrado' });
    res.json({ message: 'Plato eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
