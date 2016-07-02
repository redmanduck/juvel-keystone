var keystone = require('keystone');

var ProductReview = new keystone.List('ProductReview', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ProductReview.add({
	name: { type: String, required: true },
});

ProductReview.register();
