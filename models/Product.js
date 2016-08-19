var keystone = require('keystone');
var Types = keystone.Field.Types;


var Product = new keystone.List('Product', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	track: true
});

Product.add({
	title: { type: String, required: true },
	tagLine: { type: String },
	state: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
	mainImage: { type: Types.CloudinaryImage },
	otherImages: { type: Types.CloudinaryImages },
	description: { type: Types.Html, wysiwyg: true, height: 250 },
	dataTab1Name : {type: String, default: 'เกี่ยวกับสินค้า', required: true },
	dataTab2Name : {type: String, default: 'ข้อมูลผู้บริโภค', required: true },
	dataTab1: {type: Types.Html, wysiwyg: true, height: 250 },
	dataTab2: {type: Types.Html, wysiwyg: true, height: 250 },
	basePrice: {type: Types.Money, currency: 'th' },
	collections: { type: Types.Relationship, ref: 'ProductCollection', many: true }
});

Product.defaultColumns = 'title, basePrice, state|20%, collections|20%';
Product.register();
