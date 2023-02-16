var express = require('express');
var app = express();
var path = require('path');
var flash = require('connect-flash');
var session = require('express-session');
var dotenv = require('dotenv');
dotenv.config({
    path: '../.env'
});
//var port="www.muhammadrentacar.netfy.org";

//session
app.use(session({
    secret: 'Mn355144@',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 560000
    }
}));
//public directory
const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));


//view engine
app.set('view engine', 'hbs');
app.set('views', '../views');


//app.use
app.use(flash());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());


//route handle
app.use('/', require('./router.js'));
app.use('/auth', require('./auth.js'));


app.listen(3000);