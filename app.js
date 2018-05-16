var express = require('express');
const app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

const port = 3000;

const dataAccess = {
    email: "admin@admin.it",
    password: "admin"
}

var messages = {
    loginError: ""
}

var checkAuthentication = function (req, res, next) {
    console.log(req.session)
    if (req.session && req.session.dataAccess) {
        next();
    }
    else {
        // user doesn't have access, return an HTTP 401 response
        res.redirect("/");
    }
};

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    name: 'session',
    keys: ['username']
}));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/login', function (req, res) {
    messages.loginError = "";
    res.render('login', messages);
});

app.post('/login', function (req, res) {
    user = req.body.email;
    password = req.body.password;
    session = req.session;

    if (user == dataAccess.email && password == dataAccess.password) {
        session.dataAccess = dataAccess;
        messages.loginError = "";
        res.redirect('/personal_page');
    } else {
        messages.loginError = "I dati di accesso non sono validi";
        res.render('login', messages);
    }
});

app.get('/students', function (req, res) {
    res.render('students');
});

app.get('/teachers', function (req, res) {
    res.render('teachers');
});

app.get('/segretary', function (req, res) {
    res.render('segretary');
});

app.get('/contacts', function (req, res) {
    res.render('contacts');
});

app.get('/personal_page', checkAuthentication, function (req, res) {
    res.render('personal_page');
})

app.listen(port, function () {
    console.log("In ascolto sulla porta " + port);
});