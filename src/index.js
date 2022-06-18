const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const db = require('./config/db');
const methodOverride = require('method-override');

db.connect();

const app = express();
const port = 3000;

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'Thang'
}));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use(morgan('dev'));
app.use(express.static("src/public"));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('hbs', hbs.engine({
    helpers: {
        ifEquals: function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    },
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Thư viện router
const homePage = require('./app/controllers/HomeController');
const loginPage = require('./app/controllers/LoginController');
const register = require('./app/controllers/RegisterController');
const logout = require('./app/controllers/LogoutController');
const infoPage = require('./app/controllers/InformationController');
const myCourse = require('./app/controllers/MyCourseController');
const funcControl = require('./app/controllers/ShowAddSubject');
// ====================== Tất cả router =================================
//// home router
app.get('/', homePage.loadHomePage);
app.get('/home', homePage.loadHomePage);
app.get('/home.html', homePage.loadHomePage);

//// login router
app.get('/login', loginPage.loadLoginPage);
app.get('/login.html', loginPage.loadLoginPage);
app.post('/loginSystem', loginPage.loginSystem);
app.get('/loginSystem', loginPage.loginSystemGet);
//// logout router
app.get('/logout', logout.logout);

//// register router
app.post('/register', register.registerMember);
app.get('/activated', register.activeMember);

//// Information router
app.get('/information/:in', infoPage.loadInforPage);
app.post('/changePassword', infoPage.changePassword);
app.post('/changeName', infoPage.changeName);
app.get('/forget-password.html', infoPage.forgetLoad);
app.post('/getNewPass', infoPage.getNewPass);

//// My Course router
app.get('/sets.html', myCourse.loadYourMajor);
app.get('/addMajor', myCourse.addNewMajor);

//// My Subject router
app.get('/sets/:slug', myCourse.getSubject);
app.get('/ShowAddSubject/:sub', funcControl.LoadMajor);
app.get('/ShowSubject/:major', funcControl.viewAddQuiz);
app.get('/addSubject', myCourse.addSubject);

//// QUiz Router
app.get('/addQuiz', myCourse.addQuiz)

//// Quiz router
app.get('/:majo/:sub', myCourse.getQuiz);

// ====================== End router =======================
app.listen(port);