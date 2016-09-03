var keystone = require('keystone');

exports = module.exports = {
	post: function (req, res) {

		var view = new keystone.View(req, res);
		var locals = res.locals;

		if (!req.body.email || !req.body.password)
			throw "Invalid Username or Password";

		keystone.session.signin({ email: req.body.email, password: req.body.password }, req, res, function (user) {
			res.redirect("/" + req.body._next);
		}, function (err) {
			throw err;
		});


	},
	get: function (req, res) {
		res.render("checkout-pre")
	}
};
