const db = require('../services/dbservice');

exports.getStudents = (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql,(error,resultado)=>{
        if(error){
            console.error('error'+err.message);
            return res.status(500).send("error en el servidor")
        }
        res.json(resultado);
    });
};
