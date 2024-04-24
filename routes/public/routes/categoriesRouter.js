const express = require('express');
const {
    getAllCategories,
    getCategoryProducts,
} = require('../../../controllers/public/categoriesControllers');

const router = express.Router();

router.get('/', getAllCategories);
// router.get("/vip",getVip)
router.get('/:id', getCategoryProducts);

module.exports = router;