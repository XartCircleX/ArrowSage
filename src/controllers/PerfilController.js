const studentService = require('../services/studentService');
const circularJson = require('circular-json');

const renderPerfilPage = async (req, res) => {
  try {
    console.log("User object:", req.user);
    const studentId = req.user.id_student;
    console.log("Student ID:", studentId);

    // Obtén el grupo directamente de la base de datos
    const group = await studentService.getGroupByStudentId(studentId);
    
    // Convierte el grupo a JSON con manejo de referencias circulares
    const jsonString = circularJson.stringify(group);

    // Si jsonString es 'undefined', significa que había una referencia circular
    if (typeof jsonString !== 'undefined') {
      const groupWithoutCircularReferences = circularJson.parse(jsonString);
      console.log("Group without circular references:", groupWithoutCircularReferences);
      console.log("Result from database:", group);
      return res.render('perfil.ejs', { group: groupWithoutCircularReferences });
    } else {
      return res.render('perfil.ejs', { group: null });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).render('error', { error });
  }
};

module.exports = {
  renderPerfilPage: renderPerfilPage,
};