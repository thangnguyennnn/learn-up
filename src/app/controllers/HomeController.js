
class HomeController {
    // Tải trang home
    loadHomePage(req, res,state) {
        res.render('home', {
            title: 'Trang chủ',
            icon: 'home (1).png',         
        });
    }
}

module.exports = new HomeController;