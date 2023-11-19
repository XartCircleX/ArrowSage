const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./src/services/dbservice');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

const register = require('./src/routes/register');
app.use(register);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Conexion exitosa en el puerto:  ${PORT}`);

});

const login = require('./src/routes/login');
app.use(login);

const teachers = require('./src/routes/teachers');
app.use(teachers);

const teachersLog = require('./src/routes/teachersLog');
app.use(teachersLog);

const students = require('./src/routes/students')
app.use(students);

const dataEditor = require('./src/routes/dataEditor');
app.use(dataEditor);
