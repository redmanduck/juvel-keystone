var keystone = require('keystone');

exports = module.exports = {
    get: function (req, res) {
        var session = req.session;
        console.log(session);
        res.send(session.cart || []);
    },
    post: function (req, res) {
        var session = req.session;
        if(!session.cart){
            session.cart = [];
        }
        
        session.cart.push(req.body);
        res.send(session.cart);
    }
}