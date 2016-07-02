var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	var gcontent = keystone.list('Gallery').model.find({
		'name': 'HomeCarousel'
	}).sort('sortOrder');
	view.query('gallery', gcontent);

	// Render the view
	view.render('index');
};
