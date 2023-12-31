const express = require('express');
const app = express();
const configViewEngine = require('./src/config/viewEngine')
const bodyParser = require('body-parser');
const initWebRoutes = require('./src/routes/Web');
const cookieParser = require('cookie-parser');
const connectFlash = require("connect-flash");
const session = require("express-session");
const passport = require ("passport");

app.use(express.static('public'));
app.use(express.json());

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable flash message
app.use(connectFlash());

configViewEngine(app);


// Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

initWebRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Conexion exitosa en el puerto:  ${PORT}`);
});