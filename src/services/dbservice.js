const mysql = require("mysql");

const db = mysql.createConnection({
    host:'localhost', user:'root', password:'', database:'arrowsage'
});
db.connect((err)=>{
    if (err) {
        console.error("no jala");
    }
    else{
        console.log("conexion exitosa a la base de datos"); 
    };

});

module.exports = db;