const express = require('express');
const {
  getSubcategoryProducts,
} = require('../../../controllers/public/subcategoriesControllers');

const router = express.Router();

router.get('/:id', getSubcategoryProducts);

module.exports = router;
