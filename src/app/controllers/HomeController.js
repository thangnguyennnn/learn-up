const logger = require("../../config/winston/winston");

class HomeController {
  // Tải trang home
  loadHomePage(req, res, state) {
    logger.debug("Bắt đầu tải trang home");
    res.render("home", {
      title: "Trang chủ",
      icon: "home (1).png",
    });
    logger.debug("Bắt đầu tải trang thành công!");
  }
}

module.exports = new HomeController();
