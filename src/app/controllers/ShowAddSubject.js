const { reset } = require('nodemon');
const account = require('../models/account');
const Major = require('../models/major');
const homePage = require('./HomeController');
const subject = require('../models/subject')
const { mutipleMongooseToObject } = require('../util/mgdb');
const logger = require('../../config/winston/winston');


exports.LoadMajor = (req, res) => {
    // Kiểm tra trạng thái người dùng
    const account = req.session.account;
    logger.error('Tài khoản: ' + account.email);

    if (account != null) {
        var id = account.id;
        var mid = req.params.sub;
        console.log(id);
        if (mid === 'all') {
            Major.find({ authorID: id })
                .then(majors => {
                    res.send(mutipleMongooseToObject(majors));
                })
                .catch(error => res.send(error));
        }
        else {
            Major.find({ authorID: id, majorID: mid })
                .then(majors => {
                    res.send(mutipleMongooseToObject(majors));
                })
                .catch(error => res.send(error));
        }

    } else {
        res.render('login', { outSession: true });
    }

}

exports.viewAddQuiz = (req, res) => {
    const account = req.session.account;
    if (account != null) {
        var m = req.params.major;

        subject.find({ majorID: m })
            .then(subjects => {
                res.send(mutipleMongooseToObject(subjects));
            })
            .catch(error => res.send(error));

    } else {
        res.render('login', { outSession: true });
    }

}