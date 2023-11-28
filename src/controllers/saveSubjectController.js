const dateService = require('../services/dataService');

const renderSaveSubjectPage = async (req, res) => {
  const studentName = req.user.fullname;
  const fechaSeleccionada = req.session.fechaSeleccionada;
  const studentId = req.user.id_student; // Asegúrate de que esté definido

  res.render('saveSubject', { studentName, fechaSeleccionada, studentId });
};

const guardarDatos = async (req, res) => {
  const fechaSeleccionada = req.body.fechaSeleccionada;
  const studentId = req.user.id_student;

  try {
    // Llama al servicio para realizar la consulta a la base de datos
    const result = await dateService.saveDate(fechaSeleccionada, studentId);

    // Redirige o responde según sea necesario
    res.redirect('/mostrar');
  } catch (error) {
    // Maneja el error de manera apropiada
    console.error('Error al guardar la fecha:', error);
    res.redirect('/mostrar'); // Puedes redirigir a una página de error si lo deseas
  }
};

module.exports = {
  renderSaveSubjectPage,
  guardarDatos,
};