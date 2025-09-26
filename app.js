const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Cafeteria Online!');
});

app.listen(3000, () => {
  console.log('Cafeteria online server is running on port 3000');
});

module.exports = app;