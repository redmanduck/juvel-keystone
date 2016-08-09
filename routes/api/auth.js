var keystone = require('keystone');

exports = module.exports = {
    post: function (req, res) {
        res.send(req.body);
    }
}