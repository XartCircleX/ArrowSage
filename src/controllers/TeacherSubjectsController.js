const dateService = require('../services/dataService');

const renderTeacherSubjectPage = async (req, res) => {
    const teacherId = req.user.id_teacher;
    const teacherName = req.user.fullname;
    try {
    const Nameresult = await dateService.saveStudentName(teacherId);
    const StatusResult = await dateService.getStatus(teacherId);
        
     let studentName = "No Name"

    if (Nameresult && Nameresult.fullname) {
        studentName = Nameresult.fullname;
      }

      let StatusName = "No status"

      if (StatusResult && StatusResult.status) {
        StatusName = StatusResult.status;
        }
  
        

      res.render("TeacherSubjects", { studentName, StatusName, teacherName });
    } catch (error) {
      // Manejar errores aquí
      console.error("Error fetching data:", error);
      res.render("TeacherSubjects", { studentName: 'Unknown name', StatusName: 'Unknown status' });
    }
  };
module.exports = {
    renderTeacherSubjectPage,
};
