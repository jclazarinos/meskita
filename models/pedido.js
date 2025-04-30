const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  plato_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Plato', required: true },
  cantidad: { type: Number, required: true },
  observaciones: { type: String }
}, { _id: false });

const pedidoSchema = new mongoose.Schema({
  mozo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, default: Date.now },
  items: [itemSchema]
});

module.exports = mongoose.model('Pedido', pedidoSchema);
