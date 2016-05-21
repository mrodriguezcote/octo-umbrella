/* Auxillary file for Cart tests
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../testData/site/website.js');

//Timeout for feature tests
var specTime = 15000;

//////////////////////// URLs ////////////////////////


//////////////////////// VALUES ////////////////////////
var expectedMsg = 'The Magento cache storage has been flushed.';

//////////////////////// SELECTORS ////////////////////////
//Admin Configuration
var msgSelector = '.message.message-success.success';



exports.specTime = specTime;
exports.expectedMsg = expectedMsg;
exports.msgSelector = msgSelector;


module.exports = exports;