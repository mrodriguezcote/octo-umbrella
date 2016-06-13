/* Auxillary file for Admin tests
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../setup/config/website.js');

//Timeout for feature tests
var specTime = 15000;

//////////////////////// URLs ////////////////////////


//////////////////////// VALUES ////////////////////////
var adminLoginInput = {
	user: '#username',
	pass: '#login'
}
var expectedMsg = 'The Magento cache storage has been flushed.';

//////////////////////// SELECTORS ////////////////////////
var adminLoginButton = '#login-form>fieldset>div.form-actions>div.actions>button>span';
var adminDashboard = '#anchor-content';
var adminUsersUrl = site.homeUrl+'admin/customer/index/index/';
var msgSelector = '.message.message-success.success';

exports.specTime = specTime;
exports.adminLoginInput = adminLoginInput;
exports.expectedMsg = expectedMsg;
exports.adminLoginButton = adminLoginButton;
exports.adminDashboard = adminDashboard;
exports.adminUsersUrl = adminUsersUrl;
exports.msgSelector = msgSelector;

module.exports = exports;