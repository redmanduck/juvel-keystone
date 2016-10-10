var keystone = require('keystone');

exports = module.exports = {
    get: function (req, res) {

        var view = new keystone.View(req, res);
        var locals = res.locals;

        var q = keystone.list('Order').model.find({
            
        })
        .populate('items shippingMethod')
        .sort('-createdAt')
        .exec(function(err, results) {

            
            
                

            keystone.list('Product').model.populate(results, 'items.product', function(err, p) {
                
                p.forEach(function(item){
                    var states = [];
                    var boolt = ['isMarkedPaid', 'isVerifiedPaid', 'isShipped', 'isCancelled'];

                    boolt.forEach(function(key){
                        states.push(item[key] ? 1 : 0);
                    });

                    item.status = states.join("");
                });
                
                res.render('admin-orders',
                {
                    orders: p
                });
            });
        });


    },
    post_verify: function(req, res, next){
        var q = keystone.list('Order').model.update({
            _id: req.body.id
        }, {
            isVerifiedPaid: true
        }, function(err, ok){
            if(err){
                throw err;
            }

            res.redirect('/admin/orders');

            
        });
    }
}