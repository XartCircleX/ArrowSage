const db = require('../services/dbservice');

exports.getUser = (req, res) => {
  const name = req.body.name;
  const institutionalE = req.body.institutionalE;
  const password = req.body.password;

  const insertSQL = "INSERT INTO students (name, password, institutional_email, created_at) VALUES (?, ?, ?, NOW())";
  const valores = [name, password, institutionalE];

  db.query(insertSQL, valores, (error, resultado) => {
    if (error) {
      console.error("No se pudo insertar los datos", error);
      res.status(500).send("Error interno del servidor");
      return;
    }
    res.redirect("/login.html");
  });
};