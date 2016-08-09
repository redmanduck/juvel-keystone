var keystone = require('keystone');

exports = module.exports = {
    get: function (req, res) {
        var session = req.session;
        var k = keystone.list('Product').model.find().sort('sortOrder').exec(function(err, products){
            res.send(products);
        });
    }
}