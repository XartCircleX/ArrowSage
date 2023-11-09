const express = require ("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))

app.get("/",(req,res)=>{
    res.send("hola mundo")
});
const port = 3000;
app.listen(port,()=>{
    console.log("ejecutando por el puerto " + port)
});
const db = mysql.createConnection({
    host:'localhost', user:'root', password:'', database:'arrowsage'
});
db.connect((err)=>{
    if (err) {
        console.error("no jala");
    }
    else{
        console.log("conexion exitosa"); 
    };
});

process.on('SIGINT',()=>{
    db.end((err)=>{
        if(err){
            console.error('no se pudo desconectar'+err.message);
        }
            else{
             console.log('conexion cerrada con exito');
            }
            process.exit();
            });
        });
        
app.get('/students', (req,res)=>{
    const sql = 'SELECT * FROM students';
    db.query(sql,(error,resultado)=>{
        if(error){
            console.error('error'+err.message);
            return res.status(500).send("error pitero")
        }
        res.json(resultado);
    });
});

app.get('/students.html',(req,res)=> {
    res.sendFile(__dirname + '/students.html');
});

app.post('/register',(req,res)=>{
    const name = req.body.name;
    const institutionalE = req.body.institutionalE
    const cel = req.body.cel
    const password = req.body.password;
    const insertSQL = "INSERT INTO students (name, password, cel, institutional_email) VALUES (?, ?, ?, ?)";
    const valores = [name,password,cel,institutionalE];
    db.query(insertSQL, valores, (error,resultado)=>{
        if (error) {
            console.error("No se pudo insertar los datos" + error.message);
        }
        console.log("datos insertados correctamente");
        res.send("datos insertados correctamente");
    });
});
app.get('/register.html', (req,res)=>{
    res.sendFile(__dirname + '/register.html');
});

app.post('/login', (req, res) => {
    const { name, password } = req.body;

    const query = 'SELECT * FROM students WHERE name = ? AND password = ?';

    db.query(query, [name, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.send('Error en la autenticación');
        } else if (results.length > 0) {
            res.redirect('/students.html');
        } else {
            res.send('Nombre de usuario o contraseña incorrectos');
        }
    });
});

app.get('/login.html', (req,res)=>{
    res.sendFile(__dirname + '/login.html');
});

app.post('/erase',(req,res)=>{
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
});
app.get('/erase.html', (req,res)=>{
    res.sendFile(__dirname + '/erase.html');
});



app.post('/actualizar',(req,res)=>{
    const {nameA,name,cel,institutional_email} = req.body;
    const actualizaionSQL = "UPDATE students SET name = ?, cel = ?, institutional_email = ? where name = ?" 
db.query(actualizaionSQL,[name,cel,institutional_email,nameA],(error,resultado)=>{
    if(error){
        console.error('error en la querry'+error.message);
        return res.status(500).send('fallo en la base de datos')
    }
    else{
        console.log('actualizaste los datos');
        res.send('datos guardados exitosamente')
    }
});
});
app.get('/actualizar.html', (req,res)=>{
    res.sendFile(__dirname + '/actualizar.html');
});
