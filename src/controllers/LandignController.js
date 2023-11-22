// LandingController.js
const renderLandingPage = (req, res) => {
    // Lógica para renderizar la vista de la landing page
    res.render("landing.ejs");
};

module.exports = {
    renderLandingPage: renderLandingPage
};