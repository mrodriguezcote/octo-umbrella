var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../website.js');
var aux = require('./aux.js');

describe("Global Footer dimensions...", function() {

    beforeAll(function() { 
        xvfb.start();
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Retireve the dimentions of the newsletter block and ensure 
    they are the correct width and height */
    it("newsletter field dimensions maintained", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(newsletterField) {
                dim = [];
                dim.push(jQuery(newsletterField).height());
                dim.push(jQuery(newsletterField).width());
                return dim;
            },aux.newsletterField)
            .then(function (dimensions) { 
                expect(dimensions[0]).toBe(aux.newsletterHeight); 
                expect(dimensions[1]).toBe(aux.newsletterWidth);
                done();
            })

    }, aux.specTime);

    /* Retireve the dimentions of the zipcode field and ensure 
    they are the correct width and height */
    it("zip code field dimensions maintained", function(done) {

        browser
            .evaluate(function(zipField) {
                dim = [];
                dim.push(jQuery(zipField).height());
                dim.push(jQuery(zipField).width());
                return dim;
            },aux.zipField)
            .then(function (dimensions) { 
                expect(dimensions[0]).toBe(aux.footerZipHeight); 
                expect(dimensions[1]).toBe(aux.footerZipWidth);
                done();
            })

    }, aux.specTime);

});