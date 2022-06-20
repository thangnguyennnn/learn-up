const { reset } = require("nodemon");
const Accountt = require("../models/account");
const logger = require("../../config/winston/winston");
class LoginController {
  // Tải trang login
  loadLoginPage(req, res) {
    req.session.destroy();
    logger.info("Hủy session");
    res.render("login", {
      title: "Đăng nhập | Đăng ký",
      icon: "login.png",
    });
    logger.info("Tải trang login thành công");
  }

  // login vào hệ thống
  loginSystem(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var sessData = req.session;

    // Xác thực tài khoản
    Accountt.findOne(
      {
        email: email,
        password: password,
      },
      function (err, account) {
        if (account == null) {
          Accountt.findOne({ email: email }, (err, account) => {
            if (account === null) {
              logger.error("Tài khoản chưa được đăng ký");
            } else {
              logger.error("Mật khẩu không chính xác");
            }
            res.render("login", {
              tk: email,
              loginFail: true,
              title: "Đăng nhập",
              icon: 'login.png',
            });
          });
        } else {
          var active = account.activated;
          console.log(active);
          if (active === "activated") {
            sessData.isLogin = true;
            sessData.majo = "all";
            sessData.account = account;
            logger.info("Tài khoản: " + account.email + " đang đăng nhập!");
            res.redirect("/");
          } else {
            logger.info("Tài khoản chưa được xác thực");
            res.render("login", { tk: email, notActive: true });
          }
        }
      }
    );
  }

  loginSystemGet(req, res) {
    var email = req.query.email;
    var password = req.query.password;
    var sessData = req.session;

    account.findOne(
      {
        email: email,
        password: password,
      },
      function (err, account) {
        if (account === null)
          res.render("login", {
            tk: email,
            loginFail: true,
            title: "Đăng nhập",
          });
        else {
          var active = account.activated;
          if (active === "activated") {
            sessData.isLogin = true;
            sessData.majo = "all";
            sessData.account = account;
            res.redirect("/");
          } else {
            res.render("login", { tk: email, notActive: true });
          }
        }
      }
    );
  }
}

module.exports = new LoginController();
