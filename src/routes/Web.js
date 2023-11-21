const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const StudentsController = require('../controllers/StudentsController');
const TeachersController = require('../controllers/TeachersController');
const LoginTeachersController = require('../controllers/LoginTeachersController');
const DataEditorController = require('../controllers/DataEditorController');

router.post('/');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/../');
});

router.post('/login', LoginController.getUserLog);

router.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/../login.html');
});

router.post('/register', RegisterController.getUser);

router.get('/register.html', (req, res) => {
    res.sendFile(__dirname + '/../register.html');
});

router.post('/students', StudentsController.getStudents);

router.get('/students.html', (req, res) => {
    res.sendFile(__dirname + '/../students.html');
});

router.post('/teachers', TeachersController.getTeacher);

router.get('/teachers.html', (req, res) => {
    res.sendFile(__dirname + '/../teachers.html');
});

router.post('/loginTeachers', LoginTeachersController.getTeacherLog);

router.get('/loginTeachers.html', (req, res) => {
    res.sendFile(__dirname + '/../loginTeachers.html');
});

router.post('/Update', DataEditorController.getUpdate);
router.post('/Erase', DataEditorController.getErase);

router.get('/dataEditor.html', (req, res) => {
    res.sendFile(__dirname + '/../dataEditor.html');

});




module.exports = router;