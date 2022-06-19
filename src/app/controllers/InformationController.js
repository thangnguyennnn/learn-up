const { reset } = require("nodemon");
const userInfo = require("../models/userInformation");
const Account = require("../models/account");
const nodemailer = require("nodemailer");
const logger = require("../../config/winston/winston");

// Function tạo random ID
function generateId(len) {
  let r = (Math.random() + 1).toString(36).substring(2);
  return r;
}

// Function gửi mail lấy lại mật khẩu
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
    subject: "Mật khẩu mới",
    text: "",
    html:
      "<p>Mật khẩu mới là: " +
      token +
      '. Vui lòng click vào <a href="http://localhost:3000/login"> Đây </a> để đăng nhập!</p>',
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
}

// Lớp quản lý thông tin người dùng
class InformationController {
  // Tải thông tin người dùng
  loadInforPage(req, res) {
    const infos = req.params.in;
    const account = req.session.account;
    logger.info("Lấy thông tin người dùng thành công");

    // Kiểm tra thông tin người dùng
    logger.in("Người dùng đang đăng nhập: " + account.email);
    if (account != null) {
      var id = account.id;

      // Tìm thông tin người dùng trong DB
      userInfo.findOne(
        {
          id: id,
        },
        function (err, user) {
          // KIểm tra thông tin người dùng
          if (user !== null) {
            logger.in("Thông tin người dùng: " + user);
            var userr = new Object();
            userr.id = user.id;
            userr.name = user.name;
            userr.email = user.email;
            userr.GPA = user.GPA;
            userr.avatar = user.avatar;
            userr.joinDay = user.joinDay;

            // Tải trang thông tin người dùng
            res.render("information", {
              user: userr,
              title: "Thông tin " + user.name,
              icon: "profile.png",
              infos: infos,
            });
            logger.info("Tải thông tin thành công!");
          }
          // Nếu thông tin người dùng không tồn tại thì render về trang login
          else
            res.render("login", {
              outSession: true,
              icon: "login.png",
              title: "Đăng nhập",
            });
        }
      );
    } else {
      // Nếu người dùng không tồn tại thì render về trang login
      res.render("login", {
        outSession: true,
        icon: "login.png",
        title: "Đăng nhập",
      });
    }
  }

  // Tải trang quên mật khẩu
  forgetLoad = (req, res) => {
    res.render("forgotPass", { title: "Quên mật khẩu", icon: "login.png" });
  };

  // Function lấy mật khẩu mới
  getNewPass = (req, res) => {
    const email = req.body.email;
    logger.info("Email: " + email);

    // Tìm kiếm tài khoản dựa vào email
    Account.findOne(
      {
        email: email,
      },
      function (err, account) {
        if (account === null) {
          logger.warn("Tài khoản không tồn tại");
          res.render("forgotPass", { sendS: false });
        } else {
          logger.info("Tài khoản tồn tại, tiến hành tạo mật khẩu ngẫu nhiên!");
          var newP = generateId(20);

          // Update mật khẩu mới
          Account.updateOne(
            { email: email },
            { $set: { password: newP } },
            function (err, result) {
              // Lỗi trả về trang home ngược lại gửi mật khẩu mới cho người dùng qua email
              if (err)
                res.render("login", {
                  title: "Đăng nhập",
                  icon: "login.png",
                  err: true,
                });
              sendMail(email, newP);
              res.render("forgotPass", { sendS: true });
            }
          );
        }
      }
    );
  };

  // Function change password
  changePassword = (req, res) => {
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    const account = req.session.account;

    // Kiểm tra mật khẩu hiện tại
    if (account.password === oldPass) {
      Account.updateOne(
        { id: account.id },
        { $set: { password: newPass } },
        (err, result) => {
          if (err) {
            res.send("iihi");
          }
          if (result === null) {
            res.redirect("/information/changeFail");
          } else {
            res.redirect("/information/changeSucc");
          }
        }
      );
    } else {
      logger.warn("Mật khẩu không chính xác");
      res.redirect("/information/incorrectPass");
    }
  };

  // ĐỔi tên người dùng
  changeName = (req, res) => {
    const account = req.session.account;
    // Kiểm tra tài khoản
    if (account !== null) {
      const newName = req.body.newName;
      userInfo.updateOne(
        { id: account.id },
        { $set: { name: newName } },
        (err, result) => {
          if (err) {
            res.send("iihi");
          }
          if (result === null) {
            res.redirect("/information/s");
          } else {
            res.redirect("/information/s");
          }
        }
      );
    } else {
      res.render("login", { outSession: true });
    }
  };
}

module.exports = new InformationController();
