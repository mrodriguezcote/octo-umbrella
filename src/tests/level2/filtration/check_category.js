var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../utilities/website.js');
var specTime = 5000;

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
            .evaluate(function(itemsActualSelector) {
                return parseInt(jQuery(itemsActualSelector)[0].innerText.split(" ").slice(-1)[0]);
            },site.itemsActualSelector)
            .then(function (count) {
                expect(count).toBe(site.itemsExpected);
                done();
            })          

    },specTime);

    /* Ensure the correct sorting optino is selected by default */
    it("correct sorting option selected", function(done) {

        browser
            .evaluate(function(sortSelect) {
                return jQuery(sortSelect+' :selected').val();
            },site.sortSelect)
            .then(function (option) {
                expect(option).toBe(site.expectedSorting);
                done();
            })          

    },specTime);


});