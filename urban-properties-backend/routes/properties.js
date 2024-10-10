const express = require('express');
const { getProperties, getPropertyById, createProperty } = require('../controllers/propertyController.js');
const { upload } = require('../middleware/multer.middlewares.js');
const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/add-property', upload.single('image'),createProperty);

module.exports = router;
