const renderSubjectTeachersPage = async (req, res) => {
   
    const teacherName = req.user.fullname;

    res.render("TeacherSubjects",{ teacherName });
    console.log("teacher name:", teacherName );
};

module.exports = {
    renderSubjectTeachersPage: renderSubjectTeachersPage,
};
