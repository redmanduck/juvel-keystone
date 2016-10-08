var keystone = require('keystone');

exports = module.exports = {
	get: function (req, res) {
        keystone.session.signout(req, res, function() {
            res.redirect('/')
        });
	}
};
