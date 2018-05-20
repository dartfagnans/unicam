var express = require('express');
const app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var sqlite = require("./module/sqlite.js");

const port = 3000;

const dataAccess = {
    email: "admin@admin.it",
    password: "admin"
}

var messages = {
    loginError: "",
    isAuthenticated: false
}

var checkAuthentication = function (req, res, next) {
    if (req.session && req.session.dataAccess) {
        messages.isAuthenticated = true;
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
    res.render('index', messages);
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
    sqlite.getStudents(function (students) {
        res.render('students', {
            "students": students,
            "isAuthenticated": checkAuthentication
        });

    });
});

app.get('/teachers', function (req, res) {
    sqlite.getTeachers(function (teachers) {
        res.render('teachers', {
            "teachers": teachers,
            "isAuthenticated": checkAuthentication
        });

    });
});

app.get('/segretary', function (req, res) {
    res.render('segretary', messages);
});

app.get('/contacts', function (req, res) {
    res.render('contacts', messages);
});

app.get('/personal_page', checkAuthentication, function (req, res) {
    sqlite.getVotes(function (votes) {
        res.render('personal_page', {
            "votes": votes,
            "isAuthenticated": checkAuthentication
        });

    });
})

app.listen(port, function () {
    console.log("In ascolto sulla porta " + port);
});