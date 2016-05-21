/* Auxillary file for Admin tests
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../testData/site/website.js');

//Timeout for feature tests
var specTime = 15000;

var adminLoginInput = {
	user: '#username',
	pass: '#login'
}
var adminLogin = {
	user: 'marco@blueacorn.com',
	pass: 'pass4marco'
}
var siteLoginInput = {
	user: '#email',
	pass: '#pass'
}
var siteLogin = {
	user: 'marco@blueacorn.com',
	pass: 'pass4marco'
}
var siteRegisterInput = {
	first: '#firstname',
	last: '#lastname',
	email: '#email_address',
	pass: '#password',
	passConfirm: '#password-confirmation'
}
var siteRegister = {
	first: 'Test',
	last: 'User',
	email: 'test@blueacorn.com',
	pass: 'pass4test'
}

var loginButton = '#send2>span';
var registerButton = '#form-validate>div>div.primary>button>span';
var adminLoginButton = '#login-form>fieldset>div.form-actions>div.actions>button>span';
var adminDashboard = '#anchor-content';
var accountSidebar = '#block-collapsible-nav';
var adminUsersUrl = site.homeUrl+'admin/customer/index/index/';

exports.specTime = specTime;
exports.adminLoginInput = adminLoginInput;
exports.adminLogin = adminLogin;
exports.siteLoginInput = siteLoginInput;
exports.siteLogin = siteLogin;
exports.siteRegisterInput = siteRegisterInput;
exports.siteRegister = siteRegister;
exports.loginButton = loginButton;
exports.registerButton = registerButton;
exports.adminLoginButton = adminLoginButton;
exports.adminDashboard = adminDashboard;
exports.accountSidebar = accountSidebar;
exports.adminUsersUrl = adminUsersUrl;

module.exports = exports;