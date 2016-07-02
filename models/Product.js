var keystone = require('keystone');
var Types = keystone.Field.Types;


var Product = new keystone.List('Product', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Product.add({
	title: { type: String, required: true },
	tagLine: { type: String },
	state: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	mainImage: { type: Types.CloudinaryImage },
	description: { type: Types.Html, wysiwyg: true, height: 150 },
	collections: { type: Types.Relationship, ref: 'ProductCollection', many: true },
});


Product.defaultColumns = 'title, state|20%, collections|20%';
Product.register();
