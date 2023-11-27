const util = require('util');
const db = require('./dbservice');

const queryAsync = util.promisify(db.query).bind(db);

const saveDate = async (fechaSeleccionada, studentId) => {
  try {
    // Ajusta la consulta SQL según tu esquema de base de datos
    const query = 'INSERT INTO assesments (id_student, date) VALUES (?, ?);';
    
    // Ejecuta la consulta con los parámetros proporcionados
    const queryResult = await queryAsync(query, [studentId, fechaSeleccionada]);

    if (queryResult && queryResult.affectedRows > 0) {
      console.log('Fecha guardada exitosamente.');
      console.log(studentId)
      return { success: true };
    } else {
      console.log('No se pudo guardar la fecha.');
      return { success: false };
    }
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error;
  }
};

module.exports = {
  saveDate,
};