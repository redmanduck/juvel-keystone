var keystone = require('keystone');
var Types = keystone.Field.Types;


var Bank = new keystone.List('BankAccount', {
	map: { name: 'bankName' },
	autokey: { from: 'accountNumber', path: 'key', unique: true },
});

Bank.add({
	bankName: { type: String, required: true},
	accountNumber: { type: String, required: true, default: "0-0000-000-00" },
	bankIcon: { type: Types.CloudinaryImage }
});
Bank.defaultColumns = 'bankName, accountNumber';
Bank.register();
