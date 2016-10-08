var keystone = require('keystone');

exports = module.exports = {
    get: function (req, res) {

        var view = new keystone.View(req, res);
        var locals = res.locals;

        var order_id = req.params.order_id;
        var q = keystone.list('Order').model.findOne({
            _id: order_id
        }).update({
            isCancelled: true
        } ,function(err, ok){
            if(err){
                throw err;
            }

            res.redirect("/me/orders");

        }).exec()

    }

};
