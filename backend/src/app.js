const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Importa routers
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const userRoutes = require("./routes/user");

// Rutas
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// Ruta principal de prueba
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Petición realizada correctamente'
  });
});

// Configurar cabeceras CORS (puede ir antes o después de las rutas)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

// Levantar servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

module.exports = app;
