const express = require('express');
const {getAllBlogs, addBlogs, editBlogs, deleteBlogs} = require('../../../controllers/admin/awardsControllers');
const { getBlog }=require("../../../controllers/public/awardsController")
const router = express.Router();
router.get("/",getAllBlogs)
router.post('/', addBlogs);
router.get("/:id",getBlog )
router.patch('/:id', editBlogs);
router.delete('/:id', deleteBlogs);
// router.post("/upload-image",uploadImages) 
// router.post("/delete-image/:image",deleteImage)
module.exports = router;