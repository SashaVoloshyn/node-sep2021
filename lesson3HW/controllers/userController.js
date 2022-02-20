const users = require('../db/users');

class UserController {

    renderAllUsers(req, res) {
        if (Object.keys(req.query).length) {
            let queryResult = [...users];

            if (req.query.city) {
                queryResult = queryResult.filter(user => user.city === req.query.city);
            }

            if (req.query.age) {
                queryResult = queryResult.filter(user => user.age === req.query.age);
            }

            res.render('users', {users: queryResult});
            return;
        }

        res.render('users', {users});
    }

    renderUserInfo(req, res) {

        const { userId } = req.params;
        const user = users.find(user => user.id === +userId);

        if (!user) {
            throw new Error(`User with ID: ${userId} exist!`);
        }

        res.render('userInfo', {user});
    }

    delUser(req,res){
        const { userId } = req.params;
        const userIndex = users[userId-1];
        users.splice(users.indexOf(userIndex),1);

        res.redirect("/users");

    }
}

module.exports = new UserController();