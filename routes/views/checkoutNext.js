var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	console.log(req.body);


	view.render('checkout-' + req.body._next);

};
