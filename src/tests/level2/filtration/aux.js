/* Auxillary file for Filtration tests
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../setup/config/website.js');

//Timeout for feature tests
var specTime = 5000;

//////////////////////// URLs ////////////////////////


//////////////////////// VALUES ////////////////////////
var itemsExpected = 12;
var expectedTitle = 'Test Category';
var expectedSorting = 'position';


//////////////////////// SELECTORS ////////////////////////
var prodList = '.products.list';
var itemsActual = '.toolbar-number';
var sortSelect = '#sorter';
var viewSelect = '#limiter';


exports.specTime = specTime;
exports.itemsExpected = itemsExpected;
exports.expectedTitle = expectedTitle;
exports.expectedSorting = expectedSorting;
exports.prodList = prodList;
exports.itemsActual = itemsActual;
exports.sortSelect = sortSelect;
exports.viewSelect = viewSelect;


module.exports = exports;