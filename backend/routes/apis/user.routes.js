const express = require('express');
const { userController } = require("../../controllers")
const router = express.Router();
const { authMiddleware } = require("../../middlewares/auth.middlewares");


const user = "user";
router.get('/', userController.getAllUsers);
// router.get('/', authAdminMiddleware, userController.getAllDeactiveUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.post('/register', userController.createUser);
router.delete('/:id', userController.isDeActiveUser);
router.put('/active/:id', userController.isActiveUser);
router.post('/userfavorite', authMiddleware, userController.userFavorite);

module.exports = router;

