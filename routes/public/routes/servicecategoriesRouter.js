const express = require('express');
const {
    getOneCategory,
    getAllCategories
} = require('../../../controllers/public/servicecategoriesControllers');;
const { protect } = require("../../../controllers/admin/adminControllers")
const router = express.Router();
router.get('/',  getAllCategories);
router.get("/:id",  getOneCategory)

module.exports = router;