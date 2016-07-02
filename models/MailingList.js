var keystone = require('keystone');

var MailingList = new keystone.List('MailingList', {
	map: { name: 'email' },
	autokey: { from: 'email', path: 'key', unique: true },
});

MailingList.add({
	email: { type: String, required: true },
});

MailingList.register();
