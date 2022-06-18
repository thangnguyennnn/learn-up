const { reset } = require('nodemon');
const account = require('../models/account');
const Major = require('../models/major');
const homePage = require('./HomeController');
const { mutipleMongooseToObject } = require('../util/mgdb');
class LoginController {

    // Test đăng ký
    loadLoginPage(req, res) {
        req.session.destroy();
        res.render('login', {
            title: 'Đăng nhập | Đăng ký',
            icon: 'login.png'
        });
    }

    loginSystem(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var sessData = req.session;

        account.findOne({
            email: email,
            password: password
        }, function (err, account) {
            if (account === null)
                res.render('login', { tk: email, loginFail: true });
            else {
                var active = account.activated;
                if (active === 'activated') {
                    sessData.isLogin = true;
                    sessData.majo = 'all';
                    sessData.account = account;
                    res.redirect('/');
                }else{
                    res.render('login', { tk: email, notActive: true });
                }

            }

        });
    }

    loginSystemGet(req, res) {
        var email = req.query.email;
        var password = req.query.password;
        var sessData = req.session;
        
        account.findOne({
            email: email,
            password: password
        }, function (err, account) {
            if (account === null)
                res.render('login', { tk: email, loginFail: true });
            else {
                var active = account.activated;
                if (active === 'activated') {
                    sessData.isLogin = true;
                    sessData.majo = 'all';
                    sessData.account = account;
                    res.redirect('/');
                }else{
                    res.render('login', { tk: email, notActive: true });
                }
            }
        });
    }
}

module.exports = new LoginController;