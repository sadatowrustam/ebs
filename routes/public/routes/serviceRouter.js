const express = require('express');
const {
    getService,
    setRating,
    getComments,
} = require('../../../controllers/public/serviceControllers');

const router = express.Router();
router.get("/:id",  getService)
router.post("/comment",setRating)
router.get("/comments/:id",getComments)
module.exports = router;