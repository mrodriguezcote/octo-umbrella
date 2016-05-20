/* Feature auxillary file for Associate Orders
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../website.js');

//Timeout for feature tests
var specTime = 15000;

//////////////////////// URLs ////////////////////////
var adminConfig = site.adminUrl+'system_config/edit/section/associateorders/';
var storeConfig = site.homeUrl+'associateorders/store/index/';

//////////////////////// VALUES ////////////////////////


//////////////////////// SELECTORS ////////////////////////
//Admin Configuration
var adminCookieName = '#associateorders_cookie_name';
//Store ID field
var storeIdField = '#associated_store_id';
//Submit button
var storeIdSubmit = '.action.save.primary';
//Modal title
var modalTitle = '.modal-title';


exports.specTime = specTime;
exports.adminConfig = adminConfig;
exports.storeConfig = storeConfig;
exports.adminCookieName = adminCookieName;
exports.storeIdField = storeIdField;
exports.storeIdSubmit = storeIdSubmit;
exports.modalTitle = modalTitle;

module.exports = exports;