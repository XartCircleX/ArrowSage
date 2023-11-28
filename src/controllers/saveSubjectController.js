const dateService = require('../services/dataService');

const renderSaveSubjectPage = async (req, res) => {
  const studentName = req.user.fullname;
  const fechaSeleccionada = req.body.fechaSeleccionada;
  req.session.fechaSeleccionada = fechaSeleccionada;
  res.render('saveSubject', { studentName, fechaSeleccionada });
};

const guardarDatos = async (req, res) => {
  console.log("User object:", req.user);

  const teacherId = req.user.id_teacher;

  try {
    const Nameresult = await dateService.saveStudentName(teacherId);
    const StatusResult = await dateService.getStatus(teacherId);

    let studentName = "No Name";

    if (Nameresult && Nameresult.fullname) {
      studentName = Nameresult.fullname;
    }

    let StatusName = "No status";

    if (StatusResult && StatusResult.status) {
      StatusName = StatusResult.status;
    }

    // Verifica que req.session.fechaSeleccionada esté definido
    const fechaSeleccionada = req.session.fechaSeleccionada;
    if (!fechaSeleccionada) {
      console.error('Fecha seleccionada no definida en la sesión.');
      res.redirect('/mostrar'); // Redirige a una página de error o muestra un mensaje
      return;
    }

    // Asegúrate de que req.user sea un objeto y tenga la propiedad id_student
    const studentId = req.user && req.user.id_student;
    if (!studentId) {
      console.error('ID de estudiante no válido.');
      res.redirect('/mostrar'); // Redirige a una página de error o muestra un mensaje
      return;
    }

    // Llama al servicio para realizar la consulta a la base de datos
    const result = await dateService.saveDate(fechaSeleccionada, studentId);

    // Almacena los datos en la sesión antes de redirigir
    req.session.statusName = StatusName;
    req.session.studentName = studentName;

    // Redirige a la página donde quieres mostrar estos datos
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