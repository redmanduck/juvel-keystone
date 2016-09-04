var keystone = require('keystone');

exports = module.exports = {
    post: function (req, res) {

        var view = new keystone.View(req, res);

        var file = req.files.file;

        var orderId = req.params.order_id;
        var q = keystone.list('Order').model.findOne({
            _id: orderId
        });

        q.exec(function (err, result) {
            result.tfAttachments = {
                filename: file.name,
                originalname: 'file',
                path: '/public/slips/',
                size: file.size,
                filetype: file.mimetype   
            };
            result.save(function (done) {
                res.redirect('/me/orders');
            });
        });
    },
    get: function (req, res) {

        var view = new keystone.View(req, res);
        var locals = res.locals;

        var order_id = req.params.order_id;
        var q = keystone.list('Order').model.findOne({
            _id: order_id
        }).populate('items');

        q.exec(function (err, result) {
            keystone.list('Product').model.populate(result, 'items.product', function (err, p) {
                // console.log(result);
                // Render the view
                view.render('payment-notify', {
                    order: p
                });

            });
        });

    }

};
