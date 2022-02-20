const {Router} = require('express');

const loginController = require('../controllers/loginController');
const loginMiddleware = require('../middlewares/isRegisterFormValid');

const loginRouter = Router();

loginRouter.get('/', loginController.renderLoginForm);
loginRouter.post('/', loginMiddleware, loginController.createUser);

module.exports = loginRouter;