var keystone = require('keystone');

exports = module.exports = {
    get: function (req, res) {
        var session = req.session;
        var k = keystone.list('PostCategory').model.find().sort('sortOrder')
        .exec(function(err, posts){
            res.send(posts);
        });
    }
}