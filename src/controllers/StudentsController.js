const renderStudentPage = async (req, res) => {
    res.render("students",{
        user: req.user
    });
};

module.exports = {
    renderStudentPage: renderStudentPage,
};
