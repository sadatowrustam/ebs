const express = require('express');
const { getAllMails, getMail, deleteMail } = require('../../../controllers/admin/mailsControllers');
const router = express.Router();

router.get('/', getAllMails );
router.get('/:id',getMail );
router.delete('/:id',deleteMail);
module.exports = router; 