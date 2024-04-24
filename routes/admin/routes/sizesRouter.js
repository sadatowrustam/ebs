const express = require('express');
const {
    addSize,
    editSize,
    deleteSize
} = require('../../../controllers/admin/sizesControllers');
const {
    getAllSizes,
} = require('../../../controllers/public/sizesControllers');
const router = express.Router();
router.get('/', getAllSizes);
router.post('/', addSize);
router.patch('/:id', editSize);
router.delete('/:id', deleteSize);

module.exports = router;