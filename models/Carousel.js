var keystone = require('keystone');
var Types = keystone.Field.Types;


var Carousel = new keystone.List('Carousel', {
	map: { name: 'title' },
	autokey: { from: 'name', path: 'key', unique: true },
});

Carousel.add({
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

Carousel.register();
