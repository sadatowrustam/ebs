const express = require('express');
const {getAllBlogs} = require('../../../controllers/admin/trustingControllers');
const { getBlog }=require("../../../controllers/public/trustingController")
const router = express.Router();
router.get("/",getAllBlogs)
router.get("/:id",getBlog )
module.exports = router;