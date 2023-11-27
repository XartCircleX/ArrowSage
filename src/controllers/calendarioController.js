const rendercalendarPage = async (req, res) => {

  const studentName = req.user.fullname;

  res.render("calendario.ejs",{ studentName });
};

module.exports = {
  rendercalendarPage: rendercalendarPage,
};
