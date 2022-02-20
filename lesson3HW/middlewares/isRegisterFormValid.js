const users = require("../db/users");

function isRegisterFormValid(req, res, next) {
    const {firstName, lastName, email, password, age, city} = req.body;

    try {
        const userEmail = users.some(user => user.email === req.body.email);

        if (userEmail) {
            throw new Error('User with this email exist');
        }

        if (firstName.length < 3 || lastName.length < 3) {
            throw new Error('firstname and lastname can`t be less than 3 symbols');
        }

        if (!email.includes('@')) {
            throw new Error('Email not valid!');
        }

        if (age < 16) {
            throw new Error('Min age 16');
        }

        if (password.length < 6) {
            throw new Error('Password not valid');

        }

        if (!city || city.length < 3) {
            throw new Error('City not valid');
        }

        next();
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);

    }
}

module.exports = isRegisterFormValid;
