const db = require('../services/dbservice');

exports.getTeacherLog = (req, res) => {
    const { institutionalEM, password } = req.body;

    const query = "SELECT * FROM teachers WHERE institutional_email = ? AND password = ?";

    db.query(query, [institutionalEM, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.send('Error en la autenticación');
        } else if (results.length > 0) {
            res.redirect('/teachers.html');
        } else {
            res.send('Nombre de usuario o contraseña incorrectos');
        }
    });
};