const express = require('express');
const {getAllBlogs} = require('../../../controllers/admin/newsControllers');
const { getBlog }=require("../../../controllers/public/newsController")
const router = express.Router();
router.get("/",getAllBlogs)
router.get("/:id",getBlog )
module.exports = router;