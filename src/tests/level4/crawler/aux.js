/* Auxillary file for HTTP Crawler
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../setup/config/website.js');

//Timeout for feature tests
var specTime = 15000;

//////////////////////// URLs ////////////////////////


//////////////////////// VALUES ////////////////////////
//This link does not return a response from request
var deleteLinks = ['http://www.bbb.org/myrtle-beach/business-reviews/jewelers-retail/reeds-jewelers-in-wilmington-nc-11002451#sealclick'];

//////////////////////// SELECTORS ////////////////////////


//////////////////////// METHODS ////////////////////////
var clean = function(array) {

    deleteLinks.push('');
    for (var j=0; j<deleteLinks.length; j++) {
        for (var i=0; i<array.length; i++) {
            if (array[i] === deleteLinks[j]) {array.splice(i, 1); i--;}
        }
    }
    cleanArray = array.filter(function(elem, pos) {
        return array.indexOf(elem) === pos;
    })
    return cleanArray;

}


exports.specTime = specTime;
exports.clean = clean;

module.exports = exports;