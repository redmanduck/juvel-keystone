var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = {
	get: function(req, res) {

		var view = new keystone.View(req, res);
		var StoreProfile = keystone.list('StoreProfile').model;
		StoreProfile.findOne({
			dataName: "aboutBrand"
		}).exec(function(err, result) {
			view.render('about', {
				aboutBrand: result
			});
		});
	}
};
