const express = require('express');

const { authController } = require('../../controllers');
const router = express.Router();

router.post('/admin', authController.adminLogin);
router.post('/user', authController.userLogin);
module.exports = router;