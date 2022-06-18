const account = require('../models/account');
class LogoutController {

    logout(req, res){
        req.session.destroy();
        res.redirect('/login');
    }
}

module.exports = new LogoutController;