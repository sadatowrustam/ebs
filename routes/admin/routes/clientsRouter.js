const express = require('express');
const {
    addBanner,
    deleteBanner,
    editBanner,
} = require('../../../controllers/admin/clientsControllers');
const {
    getAllBanners,
    getBanner,
} = require('../../../controllers/public/clientControllers');
const router = express.Router();

router.get('/',  getAllBanners);
router.post('/',  addBanner);
router.get('/:id',  getBanner);
router.patch("/:id",  editBanner)
router.delete('/:id',  deleteBanner);
module.exports = router; 