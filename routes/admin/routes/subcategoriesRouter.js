const express = require('express');
const {
    addSubcategory,
    editSubcategory,
    deleteSubcategory,
    getOne,
    getAllSubcategories
} = require('../../../controllers/admin/subcategoriesControllers');
const { protect } = require("../../../controllers/admin/adminControllers")
const router = express.Router();
router.get('/:id',getAllSubcategories)
router.post('/add',  addSubcategory);
router.get("/one/:id",  getOne)
router.patch('/:id',  editSubcategory);
router.delete('/:id',  deleteSubcategory);

module.exports = router;