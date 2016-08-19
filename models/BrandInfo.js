var keystone = require('keystone');
var Types = keystone.Field.Types;


var BrandInfo = new keystone.List('BrandInfo', {
	map: { name: 'title' },
	autokey: { from: 'name', path: 'key', unique: true },
});

BrandInfo.add({
	title: { type: String },
	order: { type: Number, required: true, default: 0 },
	image: { type: Types.CloudinaryImage },
	link: {type: String },
	description: {type:String},
	showButton: {type: Boolean},
	buttonText: {type:String},
	willExpire:  {type:Boolean},
	expireOn: {type:Date}
});

BrandInfo.register();
