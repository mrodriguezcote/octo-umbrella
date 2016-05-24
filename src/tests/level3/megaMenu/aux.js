/* Feature auxillary file for Mega Menu
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../setup/config/website.js');

//Timeout for feature tests
var specTime = 15000;

//////////////////////// URLs ////////////////////////


//////////////////////// VALUES ////////////////////////
var maxItems = 10;
var megaHeight = 45;
var megaWidth = 919;

//////////////////////// SELECTORS ////////////////////////
var megaSelector = '#ui-id-1';
var topMenu = '.level-top';
var imageSelector = '.picture-container';

exports.specTime = specTime;
exports.maxItems = maxItems;
exports.megaHeight = megaHeight;
exports.megaWidth = megaWidth;
exports.megaSelector = megaSelector;
exports.topMenu = topMenu;
exports.imageSelector = imageSelector;

module.exports = exports;
