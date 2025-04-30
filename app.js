require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const usuarioRoutes = require('./routes/usuario.routes');
const platoRoutes = require('./routes/plato.routes');
const pedidoRoutes = require('./routes/pedido.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('✅ API del sistema de pedidos para restaurantes funcionando');
});

// Rutas de la API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/platos', platoRoutes);
app.use('/api/pedidos', pedidoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
