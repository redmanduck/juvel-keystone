var keystone = require('keystone');

exports = module.exports = {
	post: function (req, res) {

		var view = new keystone.View(req, res);
		var locals = res.locals;

		if (!req.body.email || !req.body.password){
			throw "Invalid Username or Password";
		}
		var cart = req.session.cart;
		keystone.session.signin({ email: req.body.email, password: req.body.password }, req, res, function (user) {
			req.session.cart = cart;
			res.redirect("/" + req.body._next);
		}, function (err) {
			throw err;
		});

	},
	get: function (req, res) {
		var csrfTokenKey = keystone.security.csrf.TOKEN_KEY;
		var csrfTokenValue = keystone.security.csrf.getToken(req, res);

		var nextPath = '';
		if ('next' in req.params) {
			nextPath = req.params.next;
		}

		res.render("login", {
			next: nextPath, 
			csrfTokenKey: csrfTokenKey,
			csrfTokenValue: csrfTokenValue
		})
	}
};
