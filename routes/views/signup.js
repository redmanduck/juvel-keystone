var keystone = require('keystone');

exports = module.exports = {
    get: function (req, res) {

        var view = new keystone.View(req, res);
        var locals = res.locals;

        view.render('signup', {
            
        });

    },
    post: function (req, res) {

        var view = new keystone.View(req, res);
        var locals = res.locals;
        

        req.user.name = req.body.info.name;
        req.user.email = req.body.info.email;
        req.user.address = req.body.info.address;
        req.user.phone = req.body.info.phone;

        var INFO = {
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            address: req.user.address
        };

        req.user.save(function () {
            view.render('account-my-information', {
                info: INFO
            });
        });


    }
};