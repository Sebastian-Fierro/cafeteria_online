var express = require('express');
const mysql = require('mysql');

var app = express();

//Editar datos de conexion a la base de datos
const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cafeteria-online'
});

bd.connect();

//app escucha peticiones en el puerto 3000
app.listen(3000, function() {
  console.log('Servidor escuchando en el puerto 3000');
});

app.get('/', (req, res, next) => {
  res.status(200).json({
    ok: true,
    message: 'Peticion realizada correctamente'
  });
});

