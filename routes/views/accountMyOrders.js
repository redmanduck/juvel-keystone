var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    var q = keystone.list('Order').model.find({
            user: req.user
        })
        .populate('items')
        .sort('-createdAt')
        .exec(function(err, results) {
            keystone.list('Product').model.populate(results, 'items.product', function(err, p) {
                view.render('account-my-orders', {
                    orders: p
                });
            });
        });



};