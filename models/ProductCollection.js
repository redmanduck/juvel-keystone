var keystone = require('keystone');

var ProductCollection = new keystone.List('ProductCollection', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ProductCollection.add({
	name: { type: String, required: true },
});

ProductCollection.relationship({ ref: 'Product', path: 'collections' });

ProductCollection.register();
