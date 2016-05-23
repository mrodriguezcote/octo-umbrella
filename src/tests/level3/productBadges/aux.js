/* Feature auxillary file for Product Badges
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../setup/site/website.js');

//Timeout for feature tests
var specTime = 19000;

//////////////////////// URLs ////////////////////////
var adminConfig = site.adminUrl+'system_config/edit/section/productbadges/';

//////////////////////// VALUES ////////////////////////


//////////////////////// SELECTORS ////////////////////////
var config = {
	globalEnabled: '#productbadges_enabled_global_enable',
	areasSelect: '#productbadges_enabled_enabledpages',
	saleSelect: '#productbadges_flag_pickers_sale_flag',
	newSelect: '#productbadges_flag_pickers_new_flag'
}
var adminSave = '#save';
var adminSaveConfirm = '.message.message-success.success';
var badgeSelector = '.product\\.badge';

exports.specTime = specTime;
exports.adminConfig = adminConfig;
exports.config = config;
exports.adminSave = adminSave;
exports.adminSaveConfirm = adminSaveConfirm;
exports.badgeSelector = badgeSelector;

module.exports = exports;