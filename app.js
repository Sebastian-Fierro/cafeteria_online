const express = require('express');
//Importamos rutas
const categoryRoutes = require('./src/routes/category');
const productRoutes = require('./src/routes/product');

const app = express();

app.use(express.json());

//Utilizamos las rutas de otros archivos
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

//Ruta principal
app.get('/', (req, res) => {
  res.send('Welcome to the Cafeteria Online!');
});

app.listen(3000, () => {
  console.log('Cafeteria online server is running on port 3000');
});

module.exports = app;