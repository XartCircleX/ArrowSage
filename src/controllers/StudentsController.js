

const renderStudentPage = async (req, res) => {

    const studentName = req.user.fullname;
    

    
    res.render("students",{ studentName });
};

module.exports = {
    renderStudentPage: renderStudentPage,
};
