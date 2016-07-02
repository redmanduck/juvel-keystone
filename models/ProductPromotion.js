var keystone = require('keystone');
var Types = keystone.Field.Types;

var ProductPromotion = new keystone.List('ProductPromotion', {
	map: { name: 'code' },
	autokey: { path: 'key', from: 'code', unique: true },
});

ProductPromotion.add({
	code: { type: String, required: true, unique: true },
	willExpire: {type: Boolean, default: false},
	expirationDate: {type: Date },
	mode: { type: Types.Select, options: 'amount, percent, free-shipping', default: 'amount', index: true }
});


ProductPromotion.register();
