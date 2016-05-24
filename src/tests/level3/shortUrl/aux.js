/* Feature auxillary file for Short URLs
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../setup/config/website.js');

//Timeout for feature tests
var specTime = 25000;

//////////////////////// URLs ////////////////////////
//Admin configuration
var adminShortUrls = site.adminUrl+'system_config/edit/section/shorturls/';


//////////////////////// VALUES ////////////////////////
//Page attributes for short URLs
var shortProduct = {
	sku: 'TS1',
	title: 'Test Simple 1'
}
var shortDisabledProduct = {
	sku: 'TSD',
	title: 'Test Simple Disabled'
}
var shortCategory = {
	id: '3',
	//id: '16',
	title: 'Test Category'
}
var fallback = {
	key: 'fallback_page',
	title: 'Short URLs Test Fallback Page'
}
var disabledFallback = {
	key: 'disabled_fallback_page',
	title: 'Short URLs Test Disabled Fallback Page'
}

//////////////////////// SELECTORS ////////////////////////
//Admin settings
var config = {
	enabled: '#shorturls_flags_enable',
	fallback: '#shorturls_fallback_cms_page',
	prodNamespace: '#shorturls_paths_product_path',
	catNamespace: '#shorturls_paths_category_path'
}
var adminSave = '#save';
var adminSaveConfirm = '.message.message-success.success';

exports.specTime = specTime;
exports.adminShortUrls = adminShortUrls;
exports.shortProduct = shortProduct;
exports.shortDisabledProduct = shortDisabledProduct;
exports.shortCategory = shortCategory;
exports.fallback = fallback;
exports.disabledFallback = disabledFallback;
exports.config = config;
exports.adminSave = adminSave;
exports.adminSaveConfirm = adminSaveConfirm;

module.exports = exports;