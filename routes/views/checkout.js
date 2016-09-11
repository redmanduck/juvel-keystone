var keystone = require('keystone');
var _ = require('lodash');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    //No user detected
    //redirect user to login page
    if (!req.user) {
        return res.redirect('/login', {next: 'checkout'});
    }
    
    //qtySet is a dict {} of qty, indexed by product id
    var qtySet = req.body.qtySet;
    Object.keys(qtySet).forEach(function(pid) {
        var qty = Number(qtySet[pid]);
        var t = _.find(req.session.cart, function(object) {
            return object._id == pid;
        });

        t.qty = qty;
    });

    //construct cart 
    req.session.cart_order = {
        info: {
            name: req.user.name,
            email: req.user.email,
            address: req.user.address
        },
        shipping: {

        },
        payment: {

        },
        items: req.session.cart
    };

    // if step not specified
    view.render('checkout-information', {
        cart_order: req.session.cart_order
    });

};