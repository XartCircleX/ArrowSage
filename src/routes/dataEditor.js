const express = require('express');
const router = express.Router();
const DataEditorController = require('../controllers/DataEditorController');

router.post('/Update', DataEditorController.getUpdate);
router.post('/Erase', DataEditorController.getErase);

router.get('/dataEditor.html', (req, res) => {
    res.sendFile(__dirname + '/../dataEditor.html');

});


module.exports = router;