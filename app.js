var express = require('express');
const app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

const port = 3000;

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

app.listen(port, function () {
    console.log("In ascolto sulla porta " + port);
});