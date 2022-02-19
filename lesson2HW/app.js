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

const users = [
    {
        firstName: 'Oleg',
        lastName: 'zzq',
        email: 'testmail1@gmail.com',
        password: '123545',
        age: '20',
        city: 'Lviv',
        id: 1
    },
    {
        firstName: 'Alena',
        lastName: 'yuasdjkwe',
        email: 'testmail2@gmail.com',
        password: '1234578',
        age: '18',
        city: 'Kyiv',
        id: 2
    },
];
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

app.post("/users/:userId", (req,res) => {
    const { userId } = req.params;
    const userIndex = users[userId-1];
    users.splice(users.indexOf(userIndex),1);
    res.redirect("/users");
});


app.get('/signIn', (req, res) => {
    res.render('signIn');
});

app.post('/signIn', (req, res) => {
    const user = users.find(user => user.email === req.body.email && user.password === req.body.password);
    if (!user) {
        res.render('notFound')
        return
    }

    res.render('userInfo', {user})
});

app.use((req, res) => {
    res.render('notFound');
});


app.listen(5400, () => {
    console.log('Server has started on PORT 5400');
});

