const validationResult = require ("express-validator");
const loginTeachersService = require("../services/loginTeacherService");

const getPageLoginTeachers = (req, res) => {
    return res.render("loginTeachers.ejs", {
        errors: req.flash("errors")
    });
};

const handleLoginTeacher = async (req, res) => {
    const errorsArr = [];
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/loginTeachers");
    }

    try {
        await loginTeachersService.handleLoginTeacher(req.body.teacherEmail, req.body.teacherPassword);
        return res.redirect("/teachers");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/loginTeachers");
    }
};

const checkLoggedTeacherIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/loginTeachers");
    }
    next();
};

const checkLoggedTeacherOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/teachers");
    }
    next();
};

const postLogOutTeachers = (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect("/loginTeachers");
    });
};

module.exports = {
    getPageLoginTeachers: getPageLoginTeachers,
    handleLoginTeacher: handleLoginTeacher,
    checkLoggedTeacherIn: checkLoggedTeacherIn,
    checkLoggedTeacherOut: checkLoggedTeacherOut,
    postLogOutTeachers: postLogOutTeachers
};