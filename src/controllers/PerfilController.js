const studentService = require('../services/studentService');

const renderPerfilPage = async (req, res) => {
  try {
    // Obtén el ID del estudiante desde la sesión
    const studentId = req.session.studentId;

    // Usa el servicio para obtener el nombre del grupo del estudiante
    const groupName = await studentService.getGroupByStudentId(studentId);

    // Renderiza la vista con la información del grupo
    res.render('perfil.ejs', { groupName: groupName });
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  renderPerfilPage: renderPerfilPage,
};