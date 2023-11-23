const renderLoginTeachersPage = async (req, res) => {
    res.render("teachers",{
        user: req.user
    });
};

module.exports = {
    renderLoginTeachersPage: renderLoginTeachersPage,
};
