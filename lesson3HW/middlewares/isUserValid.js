const users = require("../db/users");

function isUserValid(req, res, next) {
    try {
        const user = users.find(user => user.email === req.body.email && user.password === req.body.password);
        if (!user) {
            throw new Error('email or password is not provided!');
        }

        req.user = user;
        next();
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}

module.exports = isUserValid;