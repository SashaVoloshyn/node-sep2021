const { Router} = require('express');

const userController = require('../controllers/userController');

const usersRouter = Router();

usersRouter.get('/', userController.renderAllUsers);
usersRouter.get('/:userId', userController.renderUserInfo);
usersRouter.post('/:userId', userController.delUser);

module.exports = usersRouter;