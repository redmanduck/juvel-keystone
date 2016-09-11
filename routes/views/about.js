var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);

	keystone.list('StoreProfile').model.findOne({
		dataName: "aboutBrand"
	}).exec(function (err, result) {
		view.render('about', {
			aboutBrand: result
		});
	});


};
