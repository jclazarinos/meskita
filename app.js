const express = require('express');
const connectDB = require('./config/db');
const usuarioRoutes = require('./routes/usuario.routes');
const platoRoutes = require('./routes/plato.routes');
const pedidoRoutes = require('./routes/pedido.routes');

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('✅ API del sistema de pedidos para restaurantes funcionando');
  });
  

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/platos', platoRoutes);
app.use('/api/pedidos', pedidoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
