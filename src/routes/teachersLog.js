const express = require('express');
const router = express.Router();
const LoginTeachersController = require('../controllers/LoginTeachersController');

router.post('/loginTeachers', LoginTeachersController.getTeacherLog);

router.get('/loginTeachers.html', (req, res) => {
    res.sendFile(__dirname + '/../loginTeachers.html');
});

module.exports = router;