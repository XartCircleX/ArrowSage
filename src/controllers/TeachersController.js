const db = require('../services/dbservice');

exports.getTeacher = (req, res) => {
    const sql = 'SELECT * FROM teachers';
    db.query(sql,(error,resultado)=>{
        if(error){
            console.error('error'+err.message);
            return res.status(500).send("error en el servidor")
        }
        res.json(resultado);
    });
};
