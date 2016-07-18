var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	if (!req.user) {
		return res.redirect('/chlogin');
	}

	// if step not specified
	view.render('checkout-information', {
		name: req.user.name,
		email: req.user.email,
		address: req.user.address
	});

};
