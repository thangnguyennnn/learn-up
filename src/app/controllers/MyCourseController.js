const Major = require('../models/major');
const subject = require('../models/subject');
const Subject = require('../models/subject');
const quiz = require('../models/quiz');
const { mutipleMongooseToObject } = require('../util/mgdb');
class MyCourseController {

    loadYourMajor = (req, res) => {
        const account = req.session.account;
        if (account != null) {
            var id = account.id;
            Major.find({ authorID: id })
                .then(majors => {
                    res.render('myDocument', {
                        majors: mutipleMongooseToObject(majors),
                        title: 'Khóa học của bạn',
                        icon: 'home (1).png'
                    })
                })
                .catch(error => res.send(error));
        } else {
            res.render('login', { outSession: true });
        }
    }

    getSubject = (req, res) => {
        const account = req.session.account;
        var sessData = req.session;
        if (account != null) {
            const majo = req.params.slug;
            var id = account.id;
            sessData.majo = majo;
            Subject.find({ majorID: majo })
                .then(subjects => {
                    quiz.find({ subjectID: majo, majorID: majo })
                        .then(quizs => {
                            res.render('subject', {
                                quizs: mutipleMongooseToObject(quizs),
                                subjects: mutipleMongooseToObject(subjects),
                                title: majo,
                                icon: 'home (1).png'
                            })
                        })
                        .catch(error => res.send(error))

                })
                .catch(error => res.send(error));
        } else {
            res.render('login', { outSession: true });
        }
    }

    getQuiz = (req, res) => {
        const account = req.session.account;
        var sessData = req.session;
        if (account != null) {
            const majo = req.params.majo;
            const sub = req.params.sub;
            sessData.majo = majo;
            sessData.sub = sub;
            console.log(sub + '/' + majo + "aa");
            quiz.find({ majorID: majo, subjectID: sub })
                .then(quizs => {
                    console.log(mutipleMongooseToObject(quizs));
                    res.render('quizs', {
                        quizs: mutipleMongooseToObject(quizs),
                        title: 'Học tập | ' + sub,
                        icon: 'home (1).png'
                    })
                })
                .catch(error => res.send("vcc"));
        } else {
            res.render('login', { outSession: true });
        }
    }

    addNewMajor(req, res) {
        const account = req.session.account;
        if (account != null) {
            var id = account.id;
            var d = new Date();
            var month = d.getMonth() + 1;
            var createDate = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " | " + d.getDate() + '/' + month + "/" + d.getFullYear();
            var majorName = req.query.major;
            var majorKey = req.query.majorKey;
            const newMajor = {
                majorID: majorKey,
                majorName: majorName,
                authorID: id,
                createDate: createDate
            };
            const majorr = new Major(newMajor);
            majorr.save()
                .then(() => {
                    res.redirect('/sets.html');
                })
                .catch(error => res.redirect('/sets.html'));

        } else {
            res.render('login', { outSession: true });
        }
    }

    addSubject = (req, res) => {
        const account = req.session.account;
        if (account != null) {

            var d = new Date();
            var month = d.getMonth() + 1;
            var createDate = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " | " + d.getDate() + '/' + month + "/" + d.getFullYear();
            var majorID = req.query.majorID;
            var subName = req.query.subName;
            var subID = req.query.subID;

            const newSubject = {
                majorID: majorID,
                subjectName: subName,
                subjectID: subID,
                createDate: createDate
            };
            const subjectt = new subject(newSubject);
            subjectt.save()
                .then(() => {
                    res.redirect('/sets/' + majorID);
                })
                .catch(error => res.redirect('/sets.html'));

        } else {
            res.render('login', { outSession: true });
        }
    }

    addQuiz = (req, res) => {
        const account = req.session.account;
        if (account != null) {

            var d = new Date();
            var month = d.getMonth() + 1;
            var createDate = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " | " + d.getDate() + '/' + month + "/" + d.getFullYear();
            var majorID = req.query.mid;
            var subID = req.query.sid;
            var qname = req.query.qname;
            var qid = req.query.qid;
            const newQuiz = {
                subjectID: subID,
                quizID: qid,
                majorID: majorID,
                quizName: qname,
                createDate: createDate
            };
            const q = new quiz(newQuiz);
            q.save()
                .then(() => {
                    res.redirect('/' + majorID + '/' + subID);
                })
                .catch(error => res.send('/sets.html'));

        } else {
            res.render('login', { outSession: true });
        }
    }
}

module.exports = new MyCourseController;