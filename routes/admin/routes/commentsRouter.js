const express = require('express');
const { getAllMails, getMail, deleteMail, answerComment } = require('../../../controllers/admin/commentsControllers');
const router = express.Router();

router.get('/', getAllMails );
router.get('/:id',getMail );
router.patch("/:id",answerComment)
router.delete('/:id',deleteMail);
module.exports = router; 