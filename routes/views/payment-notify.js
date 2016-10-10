var keystone = require('keystone');
var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);

exports = module.exports = {
    post: function (req, res) {

        var view = new keystone.View(req, res);

        var file = req.files.file;

        var orderId = req.params.order_id;
        var q = keystone.list('Order').model.findOne({
            _id: orderId
        });

        fs.renameSync(file.path, appDir + '/public/slips/' + file.name);
        q.exec(function (err, result) {
            result.isMarkedPaid = true;
            result.transferEvidence = file.name;
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
        
        var bankAccounts = keystone.list('BankAccount').model.find({});
        view.query('bankAccounts', keystone.list('BankAccount').model.find());

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
