const db = require('../services/dbservice');

exports.getUserLog = (req, res) => {
    const { institutionalE, password } = req.body;

    const query = "SELECT * FROM students WHERE institutional_email = ? AND password = ?";

    db.query(query, [institutionalE, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.send('Error en la autenticación');
        } else if (results.length > 0) {
            res.redirect('/students.html');
        } else {
            res.send('Nombre de usuario o contraseña incorrectos');
        }
    });
};