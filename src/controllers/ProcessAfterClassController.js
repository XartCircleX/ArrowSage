const TeacherService = require('../services/teacherService');
const dateService = require('../services/dataService');

const acceptAssessment = async (req, res) => {
    try {
        const teacherId = req.user.id_teacher;

        // Utiliza el servicio para actualizar el estado de la asesoría a "accepted"
        await TeacherService.updateAssessmentStatus(teacherId,'accepted');

        // Obtén los datos necesarios, como studentName
        const Nameresult = await dateService.saveStudentName(teacherId);
        const studentName = Nameresult.fullname || 'No Name';

        // Obtén otros datos si es necesario, por ejemplo, el estado
        const StatusResult = await dateService.getStatus(teacherId);
        const status = StatusResult.status || 'No Status';

        // Redirige a la vista TeacherSubjects con las variables necesarias
        res.redirect('/TeacherSubjects');
    } catch (error) {
        console.error('Error al aceptar la asesoría:', error);
        // Manejar el error de manera apropiada, podrías redirigir a una página de error, por ejemplo.
    }
};

const declineAssessment = async (req, res) => {
    try {
        const teacherId = req.user.id_teacher;

        // Utiliza el servicio para actualizar el estado de la asesoría a "declined"
        await TeacherService.updateAssessmentStatus(teacherId ,'declined');

        // Obtén los datos necesarios, como studentName
        const Nameresult = await dateService.saveStudentName(teacherId);
        const studentName = Nameresult.fullname || 'No Name';

        // Obtén otros datos si es necesario, por ejemplo, el estado
        const StatusResult = await dateService.getStatus(teacherId);
        const status = StatusResult.status || 'No Status';

        // Redirige a la vista TeacherSubjects con las variables necesarias
        res.redirect('/TeacherSubjects');
    } catch (error) {
        console.error('Error al rechazar la asesoría:', error);
        // Manejar el error de manera apropiada, podrías redirigir a una página de error, por ejemplo.
    }
};

module.exports = {
    acceptAssessment,
    declineAssessment,
};