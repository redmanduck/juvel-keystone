var keystone = require('keystone');
var Types = keystone.Field.Types;

var Order = new keystone.List('Order', {
    autokey: { from: 'user items', path: 'slug', unique: true },
    track: true
});

var OrderItem = new keystone.List('OrderItem', {
    autokey: { from: 'product quantity createdDate', path: 'slug', unique: true },
    track: true
})

OrderItem.add({
    product: { type: Types.Relationship, ref: 'Product', many: false },
    quantity: { type: Types.Number, default: 0 },
    effectivePrice: { type: Types.Money, default: 0, required: true, currency: 'th' }
});

Order.add({
    appliedDiscount: { type: Types.Number, default: 0 },
    isMarkedPaid: { type: Types.Boolean, default: false },
    isVerifiedPaid: { type: Types.Boolean, default: false },
    tfAttachments: { type: Types.CloudinaryImages },
    paymentMethod: { type: Types.Select, options: 'bankTransfer, creditCard', default: 'bankTransfer' },
    items: { type: Types.Relationship, ref: 'OrderItem', many: true },
    user: { type: Types.Relationship, ref: 'User', index: true },
    amount: { type: Types.Money, default: 999999, required: true, currency: 'th' }
});

OrderItem.register();
Order.defaultColumns = '_id, user, isMarkedPaid, isVerifiedPaid, paymentMethod, amount';

Order.register();