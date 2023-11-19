const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

router.post('/register', RegisterController.getUser);

router.get('/register.html', (req, res) => {
    res.sendFile(__dirname + '/../register.html');
});

module.exports = router;

