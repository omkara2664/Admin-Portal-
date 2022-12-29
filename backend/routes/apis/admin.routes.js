const express = require('express');

const { adminController } = require('../../controllers');
const router = express.Router();

router.get('/', adminController.getAllAdmins);
router.post('/', adminController.createAdmin);

module.exports = router;