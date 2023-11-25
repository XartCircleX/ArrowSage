const db = require('./dbservice');

const getGroupByStudentId = async (studentId) => {
  try {
    const query = 'SELECT name FROM groups WHERE id_group = (SELECT id_group FROM students WHERE id_student = ?);';
    console.log('SQL Query:', query);

    // Utiliza await para esperar el resultado de la consulta
    const result = await db.query(query, [studentId]);

    if (result && result.length > 0) {
      return result[0].name;
    } else if (result && result.length === 0) {
      return "El estudiante no está en un grupo.";
    } else {
      console.error("Error al obtener datos del grupo. Result:", result);
      return "Error al obtener datos del grupo.";
    }
  } catch (error) {
    console.error('Error de consulta:', error); // Agrega esta línea
    throw error;
  }
};

module.exports = {
  getGroupByStudentId: getGroupByStudentId,
};