const {Router} = require('express');

const loginRouter = require('./loginRouter');
const usersRouter = require('./usersRouter');
const signInRouter = require('./signInRouter');

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/users', usersRouter);
routes.use('/signIn', signInRouter);
routes.use((req, res) => {
    res.render('notFound')
});

module.exports = routes;
