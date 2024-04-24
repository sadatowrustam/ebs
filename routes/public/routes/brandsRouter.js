const express = require('express');
const {
  getAllBrands,
  getBrandProducts,
} = require('../../../controllers/public/brandsControllers');

const router = express.Router();

router.get('/', getAllBrands);
router.get('/:id', getBrandProducts);

module.exports = router;
