var keystone = require('keystone');
var _ = require('lodash');

exports = module.exports = {
    get: function(req, res) {

        var view = new keystone.View(req, res);
        var locals = res.locals;

        // Render the view
        view.render('cart', {
            cart: req.session.cart || []
        });
    },
    post: function(req, res, next) {

        var view = new keystone.View(req, res);
        var locals = res.locals;
        //Product ID to add to cart
        var productId = req.body.productId;

        if (!req.session.cart) {
            req.session.cart = [];
        }

        keystone.list('Product').model.findOne({
            _id: productId
        }).exec(function(err, product) {

            //if alreayd in cart, add to qty
            var existP = _.find(req.session.cart, function(o) {
                return o._id === productId
            });

            if (existP) {
                existP.qty += 1;
            } else {
                product.qty = 1;
                req.session.cart.push(product);
            }

            // Render the view
            view.render('cart', {
                cart: req.session.cart
            });

        });


    }
}