/* Feature auxillary file for Homepage
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../website.js');

//Timeout for feature tests
var specTime = 10000;

//////////////////////// URLs ////////////////////////


//////////////////////// VALUES ////////////////////////
//Number of carousels displaying
var carousels = 3;
//Number of callout blocks displaying
var callouts = 6;


//////////////////////// SELECTORS ////////////////////////
var heroWrapper = '.hero-wrapper';
var owlSelector = '#maincontent .owl-stage';
var activeOwlItem = '#maincontent .owl-item.active';
var calloutSelector = '.callout-block';
var imagesSelector = '#maincontent img';
var sliderTitleLinks = '.homepage-block-title a';
var promiseBlockLinks = '.promise-block a';



exports.specTime = specTime;
exports.carousels = carousels;
exports.callouts = callouts;
exports.heroWrapper = heroWrapper;
exports.owlSelector = owlSelector;
exports.activeOwlItem = activeOwlItem;
exports.calloutSelector = calloutSelector;
exports.imagesSelector = imagesSelector;
exports.sliderTitleLinks = sliderTitleLinks;
exports.promiseBlockLinks = promiseBlockLinks;

module.exports = exports;