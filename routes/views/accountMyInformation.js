var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    view.render('account-my-information', {
        info: {
            name: req.user.name,
            email: req.user.email,
            address: req.user.address
        }
    });

};