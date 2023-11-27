const teacherService = require('../services/teacherService');

const renderSubjectPage = async (req, res) => {
  const studentName = req.user.fullname;
  try {
    const TeacherResult = await teacherService.getNameOfTeacherJuan(); // Agrega paréntesis para llamar a la función
    const asignaturesResult = await teacherService.getAsignatureTeacherJuan(); // Agrega paréntesis para llamar a la función

    let TeacherName = 'No name';

    if (TeacherResult && TeacherResult.fullname) {
      TeacherName = TeacherResult.fullname;
    }

    let asignatureName = 'No asignature';

    if (asignaturesResult && asignaturesResult.name) {
      asignatureName = asignaturesResult.name;
    }

    // Renderiza la vista 'Subject' y pasa los datos
    res.render('subjects', { studentName, TeacherName, asignatureName });
  } catch (error) {
    // Manejar errores aquí
    console.error("Error fetching data:", error);
    res.render('subjects', { studentName:'Unknow name' ,TeacherName: 'Unknown name' });
  }
};

module.exports = {
  renderSubjectPage,
};