const express = require('express');
const {
    addSubcategory,
    editSubcategory,
    deleteSubcategory,
    getOne
} = require('../../../controllers/admin/subcategoriesControllers');
const { protect } = require("../../../controllers/admin/adminControllers")
const router = express.Router();
router.post('/add',  addSubcategory);
router.get("/:id",  getOne)
router.patch('/:id',  editSubcategory);
router.delete('/:id',  deleteSubcategory);

module.exports = router;