var keystone = require('keystone');
var Types = keystone.Field.Types;

var ShippingMethod = new keystone.List('ShippingMethod', {
    map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

ShippingMethod.add({
	title: { type: String, required: true, default: 'EMS'},
    description: { type: String },
	type: { type: Types.Select, options: 'international, domestic', default: 'domestic', index: true },
    fixedFeeAmount: {type: String, required: true, default: 0.00 }
});

ShippingMethod.register();
