const express = require('express');
const {getAllBlogs} = require('../../../controllers/admin/projectsControllers');
const { getBlog }=require("../../../controllers/public/projectsController")
const router = express.Router();
router.get("/",getAllBlogs)
router.get("/:id",getBlog )
module.exports = router;