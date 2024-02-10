const express = require('express');
const app = express();
const configViewEngine = require('./src/config/viewEngine')
const bodyParser = require('body-parser');
const initWebRoutes = require('./src/routes/Web');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const connectFlash = require("connect-flash");
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

// Enable flash message using connect-flash
app.use(connectFlash());
app.use((req, res, next) => {
    console.log('Flash Messages:', req.flash());
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

configViewEngine(app);

// Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

initWebRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Conexion exitosa en el puerto:  ${PORT}`);
});
