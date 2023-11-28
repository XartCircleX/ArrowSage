const util = require('util');
const db = require('./dbservice');

const queryAsync = util.promisify(db.query).bind(db);

const saveDate = async (fechaSeleccionada,studentId) => {
  try {
    // Ajusta la consulta SQL según tu esquema de base de datos
    const query = 'INSERT INTO assesments (id_teacher,id_student, date, status, created_at, active) VALUES (1,?, ?, ("process"), Now(), 1);';
    
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

const saveStudentName = async (teacherId) => {
    try {
      // Ajusta la consulta SQL según tu esquema de base de datos
      const query = 'SELECT fullname From students WHERE id_student = (SELECT id_student FROM assesments WHERE id_teacher = ?);';
      
      // Ejecuta la consulta con los parámetros proporcionados
      const queryResult = await queryAsync(query, [teacherId]);
  
      if (queryResult.length > 0) {
        return { fullname: queryResult[0].fullname };
      } else {
        console.log('No name found.');
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

  const getStatus = async (teacherId) => {
    try {
      // Ajusta la consulta SQL según tu esquema de base de datos
      const query = 'SELECT status From assesments WHERE id_teacher = ?;';
      
      // Ejecuta la consulta con los parámetros proporcionados
      const queryResult = await queryAsync(query, [teacherId]);
  
      if (queryResult.length > 0) {
        return { status: queryResult[0].status };
      } else {
        console.log('No name found.');
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };

module.exports = {
  saveDate,
  saveStudentName,
  getStatus,
};