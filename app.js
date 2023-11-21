const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./src/routes/Web');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Conexion exitosa en el puerto:  ${PORT}`);
});