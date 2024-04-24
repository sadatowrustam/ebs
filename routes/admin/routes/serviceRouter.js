const express = require('express');
const {
    addService,
    editService,
    deleteService,
    getService,
    getAllServices
} = require('../../../controllers/admin/serviceControllers');

const router = express.Router();
router.get('/',  getAllServices);
router.post('/',  addService);
router.get("/:id",  getService)
router.patch('/:id',  editService);
router.delete('/:id',  deleteService);

module.exports = router;