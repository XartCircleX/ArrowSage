const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const StudentsController = require('../controllers/StudentsController');
const TeachersController = require('../controllers/TeachersController');
const LandingController = require('../controllers/LandignController');
const LoginTeachersController = require('../controllers/LoginTeachersController');
const catalogoController = require('../controllers/CatalogoController')
const perfilController = require('../controllers/PerfilController')
const DataEditorController = require('../controllers/DataEditorController');
const auth = require("../validation/authValidation");
const passport = require("passport");
const initPassportLocal = require("../controllers/passportLocalController");
const loginTeacherService = require('../services/loginTeacherService');

initPassportLocal();

const initWebRoutes = (app) => {
    router.get("/Teachers", LoginTeachersController.checkLoggedTeacherIn, TeachersController.renderLoginTeachersPage)
    router.get("/loginTeachers", LoginTeachersController.checkLoggedTeacherOut, LoginTeachersController.getPageLoginTeachers)
    router.post("/loginTeachers", passport.authenticate("teacher", {
        successRedirect: "/Teachers",
        failureRedirect: "/loginTeachers",
        successFlash: true,
        failureFlash: true
    }));
    
    

    router.get("/students", LoginController.checkLoggedIn, StudentsController.renderStudentPage);
    router.get("/catalogo", LoginController.checkLoggedIn, catalogoController.renderCatalogoPage);
    router.get("/perfil", LoginController.checkLoggedIn, perfilController.renderPerfilPage);
    router.get("/login",LoginController.checkLoggedOut, LoginController.getPageLogin);
    router.post("/login", passport.authenticate("student", {
        successRedirect: "/students",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", RegisterController.getPageRegister);
    router.post("/register", auth.validateRegister, RegisterController.createNewUser);
    router.post("/logout", LoginController.postLogOut);
    router.post("/logoutTeachers", LoginTeachersController.postLogOutTeachers);
    return app.use("/", router);
};



router.get("/landing", LandingController.renderLandingPage);

router.get("/", LandingController.renderLandingPage);

module.exports = initWebRoutes;