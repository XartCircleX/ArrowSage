const express = require('express');
const router = express.Router();
const TeachersController = require('../controllers/TeachersController');

router.post('/teachers', TeachersController.getTeacher);

router.get('/teachers.html', (req, res) => {
    res.sendFile(__dirname + '/../teachers.html');
});

module.exports = router;
