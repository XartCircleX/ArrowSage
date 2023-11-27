const rendercalendarTeacherPage = async (req, res) => {

  const teacherName = req.user.fullname;

  res.render("calendarioTeachers",{ teacherName });
};

module.exports = {
  rendercalendarTeacherPage: rendercalendarTeacherPage,
};
