const TeacherService = require('../services/teacherService');

const acceptAssessment = async (req, res) => {
    try {
        const teacherId = req.user.id_teacher;

        // Utiliza el servicio para actualizar el estado de la asesoría a "accepted"
        await TeacherService.updateAssessmentStatus(teacherId, 'accepted');

        // Renderiza la vista TeacherSubjects
        res.render('TeacherSubjects');  // Ajusta el nombre de la vista según tu configuración
    } catch (error) {
        console.error('Error al aceptar la asesoría:', error);
    }
};

const declineAssessment = async (req, res) => {
    try {
        const teacherId = req.user.id_teacher;

        // Utiliza el servicio para actualizar el estado de la asesoría a "declined"
        await TeacherService.updateAssessmentStatus(teacherId, 'declined');

        // Renderiza la vista TeacherSubjects
        res.render('TeacherSubjects');  // Ajusta el nombre de la vista según tu configuración
    } catch (error) {
        console.error('Error al rechazar la asesoría:', error);
    }
};

module.exports = {
    acceptAssessment,
    declineAssessment,
};