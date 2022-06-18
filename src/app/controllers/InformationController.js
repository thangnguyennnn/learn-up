const { reset } = require('nodemon');
const userInfo = require('../models/userInformation');
const Account = require('../models/account');
const nodemailer = require('nodemailer');
function generateId(len) {
    let r = (Math.random() + 1).toString(36).substring(2);
    return r;
}

function sendMail(email, token) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'hethongswp301@gmail.com',
            pass: 'scyhxahrhzqygzuw'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var mainOptions = {
        from: 'He Thong',
        to: email,
        subject: 'Mật khẩu mới',
        text: '',
        html: '<p>Mật khẩu mới là: ' + token +'. Vui lòng click vào <a href="http://localhost:3000/login"> Đây </a> để đăng nhập!</p>'
    }
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);

        } else {
            console.log('Message sent: ' + info.response);

        }
    });
}
class InformationController {

    loadInforPage(req, res) {
        const infos = req.params.in;
        const account = req.session.account;
        if (account != null) {
            var id = account.id;

            userInfo.findOne({
                id: id
            }, function (err, user) {
                if (user !== null) {
                    var userr = new Object();
                    userr.id = user.id;
                    userr.name = user.name;
                    userr.email = user.email;
                    userr.GPA = user.GPA;
                    userr.avatar = user.avatar;
                    userr.joinDay = user.joinDay;
                    res.render('information', { user: userr, title: 'Thông tin ' + user.name, icon: 'profile.png', infos: infos });
                }
                else
                    res.render('login', { outSession: true, icon: 'login.png', title: 'Đăng nhập' });
            });
        } else {
            res.render('login', { outSession: true, icon: 'login.png', title: 'Đăng nhập' });
        }
    }



    forgetLoad = (req, res) => {
        res.render('forgotPass', { title: 'Quên mật khẩu', icon: 'login.png' });
    }

    getNewPass = (req, res) => {
        const email = req.body.email;
        var newP = generateId(20);
        Account.updateOne(
            { email: email },
            { $set: { password: newP } },
            function (err, result) {
                if (err) res.send('hihi');

                if (result !== null) {
                    sendMail(email, newP);
                    res.render('forgotPass', { sendS: true });
                }
            }
        );
    }

    changePassword = (req, res) => {
        const oldPass = req.body.oldPass;
        const newPass = req.body.newPass;

        const account = req.session.account;

        if (account.password === oldPass) {
            Account.updateOne(
                { id: account.id },
                { $set: { password: newPass } },
                (err, result) => {
                    if (err) {
                        res.send('iihi');
                    }

                    if (result === null) {
                        res.redirect('/information/changeFail');
                    } else {
                        res.redirect('/information/changeSucc');
                    }
                }
            )
        } else {
            res.redirect('/information/incorrectPass');
        }
    }

    changeName = (req, res) => {
        const account = req.session.account;


        if (account !== null) {
            const newName = req.body.newName;
            userInfo.updateOne(
                { id: account.id },
                { $set: { name: newName } },
                (err, result) => {
                    if (err) {
                        res.send('iihi');
                    }

                    if (result === null) {
                        res.redirect('/information/s');
                    } else {
                        res.redirect('/information/s');
                    }
                }
            )
        } else {
            res.render('login', { outSession: true });
        }
    }
}

module.exports = new InformationController;