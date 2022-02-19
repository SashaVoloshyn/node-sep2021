const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

const users = [];
let error = '';

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    if (users.some(user => user.email === req.body.email)) {
        error = 'User with this email exist';
        res.redirect('/error');

        return;
    }

    users.push({ ...req.body, id: users.length ? users[users.length - 1].id + 1 : 1 });
    res.redirect('/users');
});

app.get('/users', (req, res) => {
    if (Object.keys(req.query).length) {
        let queryResult = [...users];
        if (req.query.city) {
            queryResult = queryResult.filter(user => user.city === req.query.city);
        }
        if (req.query.age) {
            queryResult = queryResult.filter(user => user.age === req.query.age);
        }

        res.render('users', { users: queryResult });
        return;
    }

    res.render('users', { users });
});


app.get('/error', (req, res) => {
    res.render('error', { error });
});

app.get('/users/:userId', (req, res) => {
    const user = users.find(user => user.id === +req.params.userId);
    if (!user) {
        error = `User with ID: ${req.params.userId} not exist!`;
        res.redirect('/error');
        return;
    }

    res.render('userInfo', { user });
});


app.use((req, res) => {
    res.render('notFound');
});


app.listen(5400, () => {
    console.log('Server has started on PORT 5400');
});

