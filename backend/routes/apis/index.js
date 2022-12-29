const express = require('express');
const router = express.Router();

const adminRouter = require('./admin.routes');
const userRouter = require('./user.routes');
const authsRouter = require("./auth.routes");
const Movies = require("../../movies/Movies")

router.use('/admin/register', adminRouter);
router.use('/admin', adminRouter);
router.use("/auth/login", authsRouter);
router.use("/movies", Movies);


router.use('/user', userRouter);
module.exports = router;