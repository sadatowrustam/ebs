const express = require('express');
const {getAllBlogs, addBlogs, editBlogs, deleteBlogs} = require('../../../controllers/admin/newsControllers');
const { getBlog }=require("../../../controllers/public/newsController")
const router = express.Router();
router.get("/",getAllBlogs)
router.get("/:id",getBlog )
router.post('/', addBlogs);
router.patch('/:id', editBlogs);
router.delete('/:id', deleteBlogs);
module.exports = router;