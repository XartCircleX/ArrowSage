const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const StudentsController = require('../controllers/StudentsController');
const TeachersController = require('../controllers/TeachersController');
const LandingController = require('../controllers/LandignController');
const LoginTeachersController = require('../controllers/LoginTeachersController');
const DataEditorController = require('../controllers/DataEditorController');
const auth = require("../validation/authValidation");
const passport = require("passport");
const initPassportLocal = require("../controllers/passportLocalController");

initPassportLocal();

const initWebRoutes = (app) => {
    router.get("/students", LoginController.checkLoggedIn, StudentsController.handleHelloWorld);
    router.get("/login",LoginController.checkLoggedOut, LoginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/students",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", RegisterController.getPageRegister);
    router.post("/register", auth.validateRegister, RegisterController.createNewUser);
    router.post("/logout", LoginController.postLogOut);
    return app.use("/", router);
};

router.get("/landing", LandingController.renderLandingPage);

router.get("/", LandingController.renderLandingPage);

module.exports = initWebRoutes;