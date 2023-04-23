const { Router } = require('express');

const { createUser, loginUser } = require('../controllers/users.controller');

const router = Router();

//MY ROUTES
router.post('/signup', createUser);

router.post('/login', loginUser);

module.exports = {
  userRouter: router,
};
