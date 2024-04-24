const express = require('express');
const {getAllBlogs} = require('../../../controllers/admin/awardsControllers');
const { getBlog }=require("../../../controllers/public/awardsController")
const router = express.Router();
router.get("/",getAllBlogs)
router.get("/:id",getBlog )
// router.post("/upload-image",uploadImages) 
// router.post("/delete-image/:image",deleteImage)
module.exports = router;