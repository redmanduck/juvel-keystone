var keystone = require('keystone');
var _ = require('lodash');
var Order = keystone.list('Order');
var OrderItem = keystone.list('OrderItem');
var ShippingMethod = keystone.list('ShippingMethod');


exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    //save to session
    req.session.cart_order = _.merge(req.session.cart_order, req.body);

    var pObject = req.session.cart_order;

    if (req.body._next === "done") {
        //TODO : integrity check

        //commit order to database
        ShippingMethod.model.findOne({ _id: pObject.shipping._id }, function(err, shippingMethod) {
            var totalCost = pObject.items.reduce(function(prev, curr) {
                return prev + curr.basePrice * curr.qty
            }, shippingMethod.fixedFeeAmount);
            var newOrder = new Order.model({
                isMarkedPaid: false,
                isVerifiedPaid: false,
                shippingMethod: shippingMethod,
                paymentMethod: pObject.payment.paymentMethod,
                items: pObject.items.map(function(product) {
                    var j = new OrderItem.model({
                        product: product._id,
                        quantity: product.qty,
                        effectivePrice: product.basePrice
                    });
                    j.save();
                    return j;
                }),
                user: req.user,
                amount: totalCost
            });


            newOrder.save(function(err) {
                if (err) {
                   return res.send(err);
                }
                return res.redirect('/me/orders');
            });

        });
    } else {
        ShippingMethod.model.find({}, function(err, docs) {
            view.render('checkout-' + req.body._next, {
                cart_order: req.session.cart_order,
                _shippingMethod: docs
            });
        });
    }



};