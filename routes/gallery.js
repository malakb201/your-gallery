const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery');
const { ensureAuthenticated } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

router.get('/', ensureAuthenticated, galleryController.getGallery);
router.post('/upload', ensureAuthenticated, upload.single('image'), galleryController.uploadImage);
router.get('/user/:id', ensureAuthenticated, galleryController.getUserProfile);

module.exports = router;