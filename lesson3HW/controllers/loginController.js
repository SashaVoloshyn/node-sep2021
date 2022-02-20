const users = require('../db/users');

class LoginController {

    renderLoginForm(req, res) {
        res.render('login');
    }

    createUser(req, res) {
        users.push({...req.body, id: users.length ? users[users.length - 1].id + 1 : 1});

        res.redirect('/users');
    }
}

module.exports = new LoginController();