const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const StudentsController = require('../controllers/StudentsController');
const TeachersController = require('../controllers/TeachersController');
const LandingController = require('../controllers/LandignController');
const LoginTeachersController = require('../controllers/LoginTeachersController');
const catalogoController = require('../controllers/CatalogoController');
const perfilController = require('../controllers/PerfilController');
const DataEditorController = require('../controllers/DataEditorController');
const calendarioController = require('../controllers/calendarioController');
const calendarioTeacherController =require('../controllers/calendarioTeacherController')
const SaveSubjectController = require('../controllers/saveSubjectController');
const SubjectController = require('../controllers/subjectController');
const TeacherSubjectsController = require('../controllers/TeacherSubjectsController');
const processAfterClassController = require('../controllers/ProcessAfterClassController');
const auth = require("../validation/authValidation");
const passport = require("passport");
const initPassportLocal = require("../controllers/passportLocalController");

initPassportLocal();

const initWebRoutes = (app) => {
    router.get("/students", LoginController.checkLoggedIn, StudentsController.renderStudentPage);
    router.get("/catalogo", LoginController.checkLoggedIn, catalogoController.renderCatalogoPage);
    router.get("/mostrar", LoginController.checkLoggedIn, SaveSubjectController.renderSaveSubjectPage);
    router.post("/mostrar", SaveSubjectController.guardarDatos);
    router.get("/subjects", LoginController.checkLoggedIn, SubjectController.renderSubjectPage);
    router.get("/calendario", LoginController.checkLoggedIn, calendarioController.rendercalendarPage);
    router.get("/perfil", LoginController.checkLoggedIn, perfilController.renderPerfilPage);
    router.get("/dataEditor", LoginController.checkLoggedIn, DataEditorController.renderDataEditorPage);
    router.get("/login", LoginController.checkLoggedOut, LoginController.getPageLogin);
    router.post("/login", passport.authenticate("student", {
        successRedirect: "/students",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    
    // ...
    
    router.get("/Teachers", LoginTeachersController.checkLoggedTeacherIn, TeachersController.renderLoginTeachersPage);
    router.get('/TeacherSubjects', LoginTeachersController.checkLoggedTeacherIn, TeacherSubjectsController.renderTeacherSubjectPage);
    router.post('/TeacherSubjects/acceptAssessment', LoginTeachersController.checkLoggedTeacherIn, processAfterClassController.acceptAssessment);
    router.post('/TeacherSubjects/declineAssessment', LoginTeachersController.checkLoggedTeacherIn, processAfterClassController.declineAssessment);
    router.get("/calendarioTeachers", LoginTeachersController.checkLoggedTeacherIn, calendarioTeacherController.rendercalendarTeacherPage);
    router.get("/loginTeachers", LoginTeachersController.checkLoggedTeacherOut, LoginTeachersController.getPageLoginTeachers);
    router.post("/loginTeachers", passport.authenticate("teacher", {
        successRedirect: "/Teachers",
        failureRedirect: "/loginTeachers",
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