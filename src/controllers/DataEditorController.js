const studentService = require('../services/studentService');

const renderDataEditorPage = async (req, res) => {
    try {
         const studentId = req.user.id_student;
         const studentName = req.user.fullname;

        res.render("dataEditor.ejs", { studentId, studentName });
    } catch (error) {
        console.error('Error al obtener información del estudiante: ' + error.message);
        res.status(500).send('Error al obtener información del estudiante');
    }
};

const updateStudent = async (req, res) => {
    try {
        const studentId = req.user.id_student;
        const updatedData = req.body;
        const studentName = req.user.fullname;

        // Actualizar información del estudiante
        await studentService.updateStudent(studentId, updatedData, studentName);

        // Redirigir al estudiante a la página de perfil después de la actualización
        res.redirect('/perfil');
    } catch (error) {
        console.error('Error al actualizar información del estudiante: ' + error.message);
        res.status(500).send('Error al actualizar información del estudiante');
    }
};

const deleteStudent = async (req, res) => {
    try {
        const studentId = req.user.id_student;

        // Eliminar estudiante
        await studentService.deleteStudent(studentId);

        // Redirigir al estudiante a la página principal solo si la eliminación fue exitosa
        res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar estudiante: ' + error.message);
        res.status(500).send('Error al eliminar estudiante');
    }
};

module.exports = {
    renderDataEditorPage,
    deleteStudent, 
    updateStudent,
};