const express = require('express');
const {getAllBlogs} = require('../../../controllers/admin/footerControllers');
const { getBlog }=require("../../../controllers/public/footerController")
const router = express.Router();
router.get("/",getAllBlogs)
router.get("/:id",getBlog )
module.exports = router;