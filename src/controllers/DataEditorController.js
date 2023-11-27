const db = require('../services/dbservice');

const renderDataEditorPage = (req, res) => {

    const studentName = req.user.fullname;

    res.render("dataEditor.ejs",{ studentName });
};


module.exports = {
    renderDataEditorPage: renderDataEditorPage,
};