// En tu servicio studentService.js
const db = require('./dbservice'); // Asegúrate de tener una instancia de tu conexión a la base de datos

const getGroupByStudentId = async (studentId) => {
  // Realiza una consulta a la base de datos para obtener el grupo del estudiante
  const query = "SELECT name FROM Groups WHERE id_group = (SELECT id_group FROM students WHERE id_student = ?);";   /*<---------- error actual*/
  const [result] = await db.query(query, studentId);

  if (result.length > 0) {
    // Devuelve el nombre del grupo si se encuentra
    return result[0].name;
  }

  // Devuelve null si el estudiante no está en un grupo
  return null;
};

module.exports = {
  getGroupByStudentId: getGroupByStudentId,
};