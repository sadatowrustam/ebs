const express = require('express');
const {
    addProduct,
    editProduct,
    uploadProductImage,
    deleteProduct,
    editProductStatus,
    getAllActiveProducts,
    getOneProduct,
    deleteProductImage,
    addColor,
    addSize
} = require('../../../controllers/admin/productsControllers');
const router = express.Router();

router.get('/',  getAllActiveProducts);
router.get("/:id",  getOneProduct)
router.post('/add',  addProduct);
router.patch('/:id',  editProduct);
router.patch('/edit-status/:id',  editProductStatus);
router.post("/add/color",addColor)
router.post("/add/size",addSize)
router.delete('/:id',  deleteProduct);
router.post('/upload-image',  uploadProductImage);
router.delete("/image/:id",  deleteProductImage)
module.exports = router;