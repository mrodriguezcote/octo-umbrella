/* Auxillary file for Cart tests
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../testData/site/website.js');

//Timeout for feature tests
var specTime = 15000;

//////////////////////// URLs ////////////////////////


//////////////////////// VALUES ////////////////////////


//////////////////////// SELECTORS ////////////////////////
//Admin Configuration
var itemInfo = '.item-info';
var counterLabel = '.counter-label';



exports.specTime = specTime;
exports.itemInfo = itemInfo;
exports.counterLabel = counterLabel;


module.exports = exports;