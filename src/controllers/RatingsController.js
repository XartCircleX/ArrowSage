const renderRatingsPage = (req, res) => {
    // Lógica para renderizar la vista
    res.render("ratings.ejs");
};

module.exports = {
    renderRatingsPage: renderRatingsPage
};