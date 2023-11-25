const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'arrowsage'
});

// Manejo de errores
db.on('error', (err) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error("Se perdió la conexión con la base de datos");
  } else {
    console.error("Error en la base de datos:", err.message);
  }
});

// Desconectar al cerrar la aplicación
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      return console.error('Error al cerrar la conexión de la base de datos:', err);
    }
    console.log('Conexión de la base de datos cerrada.');
    process.exit();
  });
});

module.exports = db;