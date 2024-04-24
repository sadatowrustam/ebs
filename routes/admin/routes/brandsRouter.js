const express = require('express');
const {
    addBrand,
    editBrand,
    deleteBrand,
    uploadBrandImage,
    addBrandCategory,
    deleteBrandCategory,
    getBrand,
    getUnlimited,
    getAllBrands
} = require('../../../controllers/admin/brandsControllers');

const router = express.Router();
router.get('/',  getAllBrands);
router.post('/',  addBrand);
router.get("/all",  getUnlimited)
router.get("/:id",  getBrand)
router.patch('/:id',  editBrand);
router.delete('/:id',  deleteBrand);
router.delete('/delete-category',  deleteBrandCategory);
router.post('/upload-image/:id',  uploadBrandImage);

module.exports = router;