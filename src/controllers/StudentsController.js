const handleHelloWorld = async (req, res) => {
    return res.render("students",{
        user: req.user
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};
