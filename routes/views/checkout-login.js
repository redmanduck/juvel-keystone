var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var csrfTokenKey = keystone.security.csrf.TOKEN_KEY;
	var csrfTokenValue = keystone.security.csrf.getToken(req, res);

	view.render('checkout-pre', {
		csrfTokenKey: csrfTokenKey,
		csrfTokenValue: csrfTokenValue
	});

};
