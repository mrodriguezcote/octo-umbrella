/* Auxillary file for User tests
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../setup/config/website.js');

//Timeout for feature tests
var specTime = 15000;

var siteLoginInput = {
	user: '#email',
	pass: '#pass'
}
var siteRegisterInput = {
	first: '#firstname',
	last: '#lastname',
	email: '#email_address',
	pass: '#password',
	passConfirm: '#password-confirmation'
}

var loginButton = '#send2>span';
var registerButton = '#form-validate>div>div.primary>button>span';
var accountSidebar = '#block-collapsible-nav';
var adminUsersUrl = site.homeUrl+'admin/customer/index/index/';

exports.specTime = specTime;
exports.siteLoginInput = siteLoginInput;
exports.siteRegisterInput = siteRegisterInput;
exports.loginButton = loginButton;
exports.registerButton = registerButton;
exports.accountSidebar = accountSidebar;
exports.adminUsersUrl = adminUsersUrl;

module.exports = exports;