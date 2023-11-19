const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

router.post('/login', LoginController.getUserLog);

router.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/../login.html');
});

module.exports = router;