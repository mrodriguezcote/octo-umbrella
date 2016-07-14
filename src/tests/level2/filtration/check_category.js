var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../setup/config/website.js');
var aux = require('./aux.js');

describe("Category", function() {

    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions);
        browser.authentication(site.htuser, site.htpass);
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Ensure category contains correct number of items */
    it("correct number of items in category", function(done) {

        browser
            .goto(site.categoryUrl)
            .evaluate(function(itemsActual) {
                return parseInt(jQuery(itemsActual)[0].innerText);
            },aux.itemsActual)
            .then(function (count) {
                expect(count).toBe(aux.itemsExpected);
                done();
            })          

    }, aux.specTime);

    /* Ensure the correct sorting optino is selected by default */
    it("correct sorting option selected", function(done) {

        browser
            .evaluate(function(sortSelect) {
                return jQuery(sortSelect+' :selected').val();
            },aux.sortSelect)
            .then(function (option) {
                expect(option).toBe(aux.expectedSorting);
                done();
            })          

    }, aux.specTime);


});