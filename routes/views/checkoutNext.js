var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	//save to session
	req.session.cart_order = req.body;

	keystone.list('ShippingMethod').model.find({}, function(err, docs){
		view.render('checkout-' + req.body._next, {
			cart_order: req.session.cart_order,
			_shippingMethod: docs
		});
	});

	
};
