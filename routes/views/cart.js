var keystone = require('keystone');

exports = module.exports = {
	get: function (req, res) {

		var view = new keystone.View(req, res);
		var locals = res.locals;

		// Render the view
		view.render('cart', {
			cart: req.session.cart || []
		});
	},
	post: function (req, res, next) {
		
		var view = new keystone.View(req, res);
		var locals = res.locals;
		//Product ID to add to cart
		var productId = req.body.productId;

		req.session.cart = [];
		keystone.list('Product').model.findOne({
			_id: productId
		}).exec(function(err, product){
			req.session.cart.push(product);
			// Render the view
			view.render('cart', {
				cart: req.session.cart || []
			});
			
        });

		
	}
}