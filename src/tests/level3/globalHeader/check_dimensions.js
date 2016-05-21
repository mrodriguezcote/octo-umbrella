var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../website.js');
var aux = require('./aux.js');

describe("Global Header dimensions", function() {

    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Ensure the header block remains the correct width */
    it("max width is applied", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(headerBlock) {
                return jQuery(headerBlock).width();
            },aux.headerBlock)
            .then(function (width) { 
                expect(width).toBe(aux.headerWidth); 
                done();
            })

    }, aux.specTime);

    /* Ensure the logo block remains the correct width and height */
    it("main logo dimensions maintained", function(done) {

        browser
            .evaluate(function(logo) {
                dim = [];
                dim.push(jQuery(logo.main).height());
                dim.push(jQuery(logo.main).width());
                return dim;
            },aux.logo)
            .then(function (dimensions) { 
                expect(dimensions[0]).toBe(aux.logoHeight); 
                expect(dimensions[1]).toBe(aux.logoWidth);
                done();
            })

    }, aux.specTime);

    /* Ensure the search bar block remains the correct width and height */
    it("search bar dimensions maintained", function(done) {

        browser
            .evaluate(function(searchField) {
                dim = [];
                dim.push(jQuery(searchField).height());
                dim.push(jQuery(searchField).width());
                return dim;
            },aux.searchField)
            .then(function (dimensions) { 
                expect(dimensions[0]).toBe(aux.searchHeight); 
                expect(dimensions[1]).toBe(aux.searchWidth);
                done();
            })

    }, aux.specTime);

});