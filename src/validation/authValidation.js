const { check } = require("express-validator");

const validateRegister = [
    check("email", "Invalid email").isEmail().trim(),

    check("password", "Invalid password. Password must be at least 2 chars long")
    .isLength({ min: 2 }),

    check("passwordConfirmation", "Password confirmation does not match password")
    .custom((value, { req }) => {
        return value === req.body.password
    })
];

const validateLoginStudents = [
    check("studentEmail", "Invalid email").isEmail().trim(),

    check("studentPassword", "Invalid password")
    .not().isEmpty()
];

const validateLoginTeachers = [
    check("teacherEmail", "Invalid email").isEmail().trim(),

    check("teacherPassword", "Invalid password")
    .not().isEmpty()
];


module.exports = {
    validateRegister: validateRegister,
    validateLoginStudents: validateLoginStudents,
    validateLoginTeachers: validateLoginTeachers
};
