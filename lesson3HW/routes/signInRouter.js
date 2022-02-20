const {Router} = require('express');

const signInController = require('../controllers/signInController');
const signInMiddleware = require('../middlewares/isUserValid');

const signInRoute = Router();

signInRoute.get('/', signInController.renderSignInPage);
signInRoute.post('/', signInMiddleware,signInController.signInUser);

module.exports = signInRoute;