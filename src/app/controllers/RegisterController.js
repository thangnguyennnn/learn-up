const Account = require("../models/account");
const userInfo = require("../models/userInformation");
const Major = require("../models/major");
const nodemailer = require("nodemailer");

function generateId(len) {
  let r = (Math.random() + 1).toString(36).substring(2);
  return r;
}

function sendMail(email, token) {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "hethongswp301@gmail.com",
      pass: "scyhxahrhzqygzuw",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  var mainOptions = {
    from: "He Thong",
    to: email,
    subject: "Kích hoạt tài khoản",
    text: "http://localhost:3000/activated?token=" + token + "&email=" + email,
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
}

class RegisterController {
  // Test đăng ký
  registerMember(req, res) {
    var email = req.body.email;
    Account.findOne(
      {
        email: email,
      },
      function (err, account) {
        if (account === null) {
          const password = req.body.password;
          const id = email;
          const token = generateId(20);
          console.log(token);
          const newA = {
            id: id,
            email: email,
            password: password,
            role: 0,
            activated: token,
          };
          const acc = new Account(newA);

          acc
            .save()
            .then(() => {
              var d = new Date();
              var month = d.getMonth() + 1;
              var join =
                d.getHours() +
                ":" +
                d.getMinutes() +
                ":" +
                d.getSeconds() +
                " | " +
                d.getDate() +
                "/" +
                month +
                "/" +
                d.getFullYear();
              const newInfor = {
                id: id,
                email: email,
                name: email,
                avatar: null,
                GPA: 0,
                joinDay: join,
              };
              sendMail(email, token);
              const u = new userInfo(newInfor);
              u.save()
                .then(() =>
                  res.redirect(
                    "/loginSystem?email=" + email + "&password=" + password
                  )
                )
                .catch((error) => res.handleError(error));
            })
            .catch((error) => res.handleError(error));
        } else {
          res.render("login", { EmailExist: true });
        }
      }
    );
  }
  
  // Xác thực member
  activeMember(req, res) {
    var token = req.query.token;
    var email = req.query.email;
    Account.findOneAndUpdate(
      { activated: token, email: email },
      { $set: { activated: "activated" } },
      (err, result) => {
        if (err) res.send("hihi");
        if (result === null) res.render("login", { activatedd: true });
        else {
          var d = new Date();
          var month = d.getMonth() + 1;
          var createDate =
            d.getHours() +
            ":" +
            d.getMinutes() +
            ":" +
            d.getSeconds() +
            " | " +
            d.getDate() +
            "/" +
            month +
            "/" +
            d.getFullYear();
          var major = {
            majorID: "OD",
            majorName: "Thư mục gốc",
            authorID: email,
            createDate: createDate,
          };
          var m = new Major(major);
          m.save()
            .then(() => {
              res.render("login", { activated: true });
            })
            .catch((err) => res.send("hihi"));
        }
      }
    );
  }
}

module.exports = new RegisterController();
