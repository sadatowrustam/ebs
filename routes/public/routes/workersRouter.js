const express = require('express');
const {
    getAllBanners,
} = require('../../../controllers/public/workersControllers');
const router = express.Router();

router.get('/',  getAllBanners);
module.exports = router; 