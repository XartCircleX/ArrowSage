const db = require('../services/dbservice');

exports.getUpdate = (req, res) => {
    const {institutionalES,name,cel,institutional_email} = req.body;
    const actualizaionSQL = "UPDATE students SET name = ?, institutional_email = ? where institutional_email = ?" 
db.query(actualizaionSQL,[name,institutional_email,institutionalES],(error,resultado)=>{
    if(error){
        console.error('error en la querry'+error.message);
        return res.status(500).send('fallo en la base de datos')
    }
    else{
        console.log('actualizaste los datos');
        res.send('datos guardados exitosamente')
    }
});
};

exports.getErase = (req, res) => {
    const {name, institutional_email} = req.body
    const eliminarSQL = "delete from students where name = ? AND institutional_email = ?"
db.query(eliminarSQL,[name, institutional_email],(error,resultado)=>{
    if(error){
        console.error('error en consulta'+error.message);
        return res.status(500).send('datos no eliminados, error de base de datos');
    }
    else{
        console.log('eliminaste los datos');
        res.send('datos elminados correctamente')
    }
});
};

