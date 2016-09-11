var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'products';

	var q = keystone.list('Product').model.find().where('state', 'published').sort('title');
	q.exec(function (err, results) {
		// locals.data.posts = results;

		// Render the view
		view.render('products', {
			products: results
		});
		
	});

};
