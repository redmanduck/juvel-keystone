var keystone = require('keystone');
var Types = keystone.Field.Types;


var SD = new keystone.List('SiteConfig', {
	map: { name: 'dataName' },
	autokey: { from: 'name', path: 'key', unique: true },
});

var options = 'aboutBrand, companyName';
SD.add({
	dataName: { type: Types.Select, options: options, index: true },
    data: {
		article: { type: Types.Html, wysiwyg: true, height: 150 },
        shortText: { type: String },
		images: { type: Types.CloudinaryImages }
	}
});

SD.defaultColumns = 'dataName, data.shortText, data.images|20%, data.article|20%';
SD.register();