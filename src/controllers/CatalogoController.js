const renderCatalogoPage = async (req, res) => {

    const studentName = req.user.fullname;

    res.render("catalogo.ejs",{ studentName });
};

module.exports = {
    renderCatalogoPage: renderCatalogoPage,
};
