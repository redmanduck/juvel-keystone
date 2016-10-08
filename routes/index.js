/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var multer  = require('multer')
var upload = multer({ dest: '/public/slips' })

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};
var restful = require('restful-keystone')(keystone);
// Setup Route Bindings
exports = module.exports = function (app) {

	//Top
	app.get('/', routes.views.index);
	app.get('/about', routes.views.about.get);
	//Blog
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	//Cart
	app.get('/cart', routes.views.cart.get);
	app.post('/cart', routes.views.cart.post);
	//Checkout
	app.all('/checkout/', routes.views.checkout);
	app.post('/checkout/next', routes.views['checkout-next']);
	app.get('/checkout/:name', routes.views['checkout-view']);
	//User management
	app.get('/login', keystone.security.csrf.middleware.init, routes.views.login.get);
	app.post('/login', keystone.security.csrf.middleware.validate, routes.views.login.post);
	app.get('/me', middleware.requireUser, routes.views['account-my']);
	app.get('/me/orders', middleware.requireUser, routes.views['account-my-orders']);
	app.get('/me/information', middleware.requireUser, routes.views['account-my-information'].get);
	app.post('/me/information', middleware.requireUser, routes.views['account-my-information'].post)
	//Product
	app.get('/products', routes.views.products);
	//Payment Notification
	app.get('/payment/notify/:order_id', routes.views['payment-notify'].get);
	app.post('/payment/notify/:order_id', upload.single('file'), routes.views['payment-notify'].post);
	app.get('/payment/cancel/:order_id', routes.views['payment-cancel'].get);

	app.get('/admin/orders', middleware.requireUser, routes.views['admin-orders'].get);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
