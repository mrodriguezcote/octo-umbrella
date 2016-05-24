/* Feature auxillary file for Brand Manager
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../setup/config/website.js');

//Timeout for feature tests
var specTime = 25000;


//////////////////////// URLs ////////////////////////
//Admin configuration page
var adminFooter = site.adminUrl+'system_config/edit/section/ba_footer/';

//////////////////////// VALUES ////////////////////////
//Brands Block
var minBrands = 5;
var brandsHeight = 75;
var brandsWidth = 1024;

//////////////////////// SELECTORS ////////////////////////
//Admin Configuration
var adminBrandsEnabled = '#ba_footer_brands_brands_block_enabled';
var adminSave = '#save';
var adminSaveConfirm = '.message.message-success.success';

//Brands
var brandsBlock = '.brands-container';
var brandsWidget = '.brands-widget-insertion';
var brandImage = '.brand-logo';
var activeBrands = '.owl-item.active';




exports.specTime = specTime;
exports.adminFooter = adminFooter;
exports.adminSave = adminSave;
exports.adminSaveConfirm - adminSaveConfirm;
exports.minBrands = minBrands;
exports.brandsHeight = brandsHeight;
exports.brandsWidth = brandsWidth;
exports.adminBrandsEnabled = adminBrandsEnabled;
exports.brandsBlock = brandsBlock;
exports.brandsWidget = brandsWidget;
exports.brandImage = brandImage;
exports.activeBrands = activeBrands;

module.exports = exports;