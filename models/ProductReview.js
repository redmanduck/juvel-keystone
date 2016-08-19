var keystone = require('keystone');
var Types = keystone.Field.Types;

var ProductReview = new keystone.List('ProductReview', {
	autokey: { from: 'author', path: 'slug' },
});

ProductReview.add({
	author: { type: Types.Relationship, ref: 'User' },
	comment: { type: String }
});

ProductReview.register();
