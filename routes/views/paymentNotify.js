var keystone = require('keystone');

exports = module.exports = {
    post: function(req,res){
        console.log(req.files);
    },
    get: function (req, res) {

        var view = new keystone.View(req, res);
        var locals = res.locals;
        
        var order_id = req.params.order_id;
        var q = keystone.list('Order').model.findOne({
            _id: order_id
        }).populate('items');
        
        q.exec(function (err, result) {
            keystone.list('Product').model.populate(result, 'items.product', function(err, p) {
                // console.log(result);
                // Render the view
                view.render('payment-notify',{
                    order: p
                });
            });
            
        });

    }
    
};
