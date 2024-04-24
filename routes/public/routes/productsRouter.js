const express = require('express');
const {
    searchProducts,
    getOneProduct,
    discount,
    getComments,
    setRating,
    getProducts,
    getColors
} = require('../../../controllers/public/productsControllers');

const router = express.Router();
router.get("/", getProducts)
router.get('/search', searchProducts);
router.get("/discount", discount)
router.get("/comments/:id",getComments)
router.get("/colors",getColors)
router.get("/:id", getOneProduct)
router.post("/comment", setRating)

module.exports = router;