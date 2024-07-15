const express = require('express');
const multer = require('multer');
const upload = multer();
const handleSaveFile = require('../controllers/fileSave');
const getFile = require('../controllers/fileGet');
const deleteFile = require('../controllers/DeleteFile');
const codeRunner = require('../controllers/runcode');
const router = express.Router();

router.post('/savefile', upload.single('file'), handleSaveFile);
router.post('/getfile',getFile);
router.post('/runcode',codeRunner);
router.post('/deletefile',deleteFile);
module.exports = router;