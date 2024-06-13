const express = require('express');
const {getAllBlogs} = require('../../../controllers/admin/ourWorksControllers');
const { getBlog }=require("../../../controllers/public/ourWorksController")
const router = express.Router();
router.get("/",getAllBlogs)
router.get("/:id",getBlog )
module.exports = router;