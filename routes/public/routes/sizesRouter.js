const express = require('express');
const {
    getAllSizes,
} = require('../../../controllers/public/sizesControllers');
const router = express.Router();
router.get('/', getAllSizes);

module.exports = router;