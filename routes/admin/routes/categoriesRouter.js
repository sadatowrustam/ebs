const express = require('express');
const {
    addCategory,
    editCategory,
    deleteCategory,
    getOneCategory,
    searchCategory,
    getAllCategories
} = require('../../../controllers/admin/categoriesControllers');;
const { protect } = require("../../../controllers/admin/adminControllers")
const router = express.Router();
router.get('/',  getAllCategories);
router.post('/',  addCategory);
router.get("/:id",  getOneCategory)
// router.get("/search",  searchCategory)
router.patch('/:id',  editCategory);
router.delete('/:id',  deleteCategory);

module.exports = router;