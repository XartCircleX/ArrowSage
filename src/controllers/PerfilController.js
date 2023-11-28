const studentService = require('../services/studentService');

const renderPerfilPage = async (req, res) => {
  console.log("User object:", req.user);
  const studentId = req.user.id_student;
  const studentName = req.user.fullname;
  const studentEmail = req.user.email;

  try {
    const groupResult = await studentService.getGroupByStudentId(studentId);
    const specialtyResult = await studentService.getSpecialtyByStudentId(studentId);
    const turnResult = await studentService.getTurnByStudentId(studentId);
    const tutorResult = await studentService.getTutorByStudentId(studentId);
    const periodResult = await studentService.getPeriodByStudentId(studentId);

    let groupName = 'No Group';
    let specialtyName = 'No Specialty';
    let turnName = 'No Turn';
    let tutorName = 'No Tutor';
    let periodName = 'No Period';

    if (groupResult && groupResult.id_group) {
      groupName = groupResult.id_group;
    }

    if (specialtyResult && specialtyResult.specialty) {
      specialtyName = specialtyResult.specialty;
    }

    if (turnResult && turnResult.turn) {
      turnName = turnResult.turn;
    }

    if (tutorResult && tutorResult.tutor) {
      tutorName = tutorResult.tutor;
    }

    if (periodResult && periodResult.id_period) {
      periodName = periodResult.id_period;
    }

    res.render("perfil", { groupName, specialtyName, studentName, studentEmail, turnName, tutorName, periodName });
  } catch (error) {
    // Manejar errores aquí
    console.error("Error fetching data:", error);
    res.render("perfil", { groupName: 'Unknown Group', specialtyName: 'Unknown Specialty', turnName: 'Unknown Turn', tutorName: 'Unknown Tutor', periodName: 'Unknown Period' });
  }
};

module.exports = {
  renderPerfilPage,
};