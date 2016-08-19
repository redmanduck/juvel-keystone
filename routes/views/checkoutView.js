var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	if(!req.session.cart_order){
		return res.send("No item in cart");
	}

	keystone.list('ShippingMethod').model.find({}, function(err, docs){
		view.render('checkout-' + req.params.name, {
			cart_order: req.session.cart_order,
			_shippingMethod: docs
		});
	});

	

};
