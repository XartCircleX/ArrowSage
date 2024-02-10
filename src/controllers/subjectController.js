const teacherService = require('../services/teacherService');


const renderSubjectPage = async (req, res) => {
  const studentName = req.user.fullname;
  const success = req.query.success;
  const error = req.query.error;
  try {
    const TeacherJuanResult = await teacherService.getNameOfTeacherJuan(); // Agrega paréntesis para llamar a la función
    const asignaturesJuanResult = await teacherService.getAsignatureTeacherJuan(); // Agrega paréntesis para llamar a la función
    const TeacherKusakaResult = await teacherService.getNameOfTeacherKusaka(); // Agrega paréntesis para llamar a la función
    const asignaturesKusakaResult = await teacherService.getAsignatureTeacherKusaka(); // Agrega paréntesis para llamar a la función
    const TeacherRomanResult = await teacherService.getNameOfTeacherRoman(); // Agrega paréntesis para llamar a la función
    const asignaturesRomanResult = await teacherService.getAsignatureTeacherRoman(); // Agrega paréntesis para llamar a la función

    let TeacherJuanName = 'No name';

    if (TeacherJuanResult && TeacherJuanResult.fullname) {
      TeacherJuanName = TeacherJuanResult.fullname;
    }

    let asignatureJuanName = 'Juan doesn´t have asignature';

    if (asignaturesJuanResult && asignaturesJuanResult.name) {
      asignatureJuanName = asignaturesJuanResult.name;
    }

    let TeacherKusakaName = 'No name';

    if (TeacherKusakaResult && TeacherKusakaResult.fullname) {
      TeacherKusakaName = TeacherKusakaResult.fullname;
    }
    let asignatureKusakaName = 'Kusaka doesn´t have asignature';

    if (asignaturesKusakaResult && asignaturesKusakaResult.name) {
      asignatureKusakaName = asignaturesKusakaResult.name;
    }

    let TeacherRomanName = 'No name';

    if (TeacherRomanResult && TeacherRomanResult.fullname) {
      TeacherRomanName = TeacherRomanResult.fullname;
    }
    let asignatureRomanName = 'Roman doesn´t have asignature';

    if (asignaturesRomanResult && asignaturesRomanResult.name) {
      asignatureRomanName = asignaturesRomanResult.name;
    }

    // Renderiza la vista 'Subject' y pasa los datos
    res.render('subjects', {
      studentName,
      TeacherJuanName,
      asignatureJuanName,
      TeacherKusakaName,
      asignatureKusakaName,
      TeacherRomanName,
      asignatureRomanName,
      success,
      error
  });
  } catch (error) {
    // Manejar errores aquí
    console.error("Error fetching data:", error);
    res.render('subjects', { studentName:'Unknow name' ,TeacherName: 'Unknown name' });
  }
};

module.exports = {
  renderSubjectPage,
};