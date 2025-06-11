var express = require('express');
const cors = require('cors');

var app = express();
app.use(cors());

const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res, next) => {
  res.status(200).json({
    ok: true,
    message: 'Peticion realizada correctamente'
  });
});

app.listen(3000, function() {
  console.log('Servidor escuchando en el puerto 3000');
});

module.exports = app;