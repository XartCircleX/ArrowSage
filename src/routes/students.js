const express = require('express');
const router = express.Router();
const StudentsController = require('../controllers/StudentsController');

router.post('/students', StudentsController.getStudents);

router.get('/students.html', (req, res) => {
    res.sendFile(__dirname + '/../students.html');
});

module.exports = router;
