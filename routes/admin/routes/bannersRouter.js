const express = require('express');
const {
    addBanner,
    deleteBanner,
    editBanner,
    getAllBanners
} = require('../../../controllers/admin/bannerControllers');
const {
    getBanner,
} = require('../../../controllers/public/bannerControllers');
const router = express.Router();
router.get('/',  getAllBanners);
router.post('/',  addBanner);
router.get('/:id',  getBanner);
router.patch("/:id",  editBanner)
router.delete('/:id',  deleteBanner);
module.exports = router; 