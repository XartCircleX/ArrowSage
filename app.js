const express = require ("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(express.static(__dirname + '/public'));

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

app.get('/teachers', (req,res)=>{
    const sql = 'SELECT * FROM teachers';
    db.query(sql,(error,resultado)=>{
        if(error){
            console.error('error'+err.message);
            return res.status(500).send("error pitero")
        }
        res.json(resultado);
    });
});

app.get('/teachers.html',(req,res)=> {
    res.sendFile(__dirname + '/teachers.html');
});

app.post('/loginTeachers', (req, res) => {
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
});

app.get('/loginTeachers.html', (req,res)=>{
    res.sendFile(__dirname + '/loginTeachers.html');
});

app.post('/register',(req,res)=>{
    const name = req.body.name;
    const institutionalE = req.body.institutionalE
    const password = req.body.password;
    const insertSQL = "INSERT INTO students (name, password, institutional_email, created_at) VALUES (?, ?, ?, NOW())";
    const valores = [name,password,institutionalE];
    db.query(insertSQL, valores, (error,resultado)=>{
        if (error) {
            console.error("No se pudo insertar los datos" + error.message);
        }
        res.redirect("/login.html");
    });
});
app.get('/register.html', (req,res)=>{
    res.sendFile(__dirname + '/register.html');
});

app.post('/login', (req, res) => {
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
