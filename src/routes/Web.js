const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const StudentsController = require('../controllers/StudentsController');
const TeachersController = require('../controllers/TeachersController');
const LoginTeachersController = require('../controllers/LoginTeachersController');
const DataEditorController = require('../controllers/DataEditorController');
const auth = require("../validation/authValidation");
const passport = require("passport");
const initPassportLocal = require("../controllers/passportLocalController");


// Init all passport
initPassportLocal();

const initWebRoutes = (app) => {
    router.get("/", LoginController.checkLoggedIn, StudentsController.handleHelloWorld);
    router.get("/login",LoginController.checkLoggedOut, LoginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", RegisterController.getPageRegister);
    router.post("/register", auth.validateRegister, RegisterController.createNewUser);
    router.post("/logout", LoginController.postLogOut);
    return app.use("/", router);
};


router.get('/', (req, res) => {
    res.sendFile(__dirname + '/../');
});


module.exports = initWebRoutes;