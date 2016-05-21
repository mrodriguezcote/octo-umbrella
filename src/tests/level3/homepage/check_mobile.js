var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../testData/site/website.js');
var aux = require('./aux.js');

describe("Mobile homepage", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronMobileOptions); 
    });
    
    afterAll(function() {
        browser.end().then(); 
        xvfb.stop(); 
    });

    it("one owl item displays per slider", function(done) {
        
        browser
            .goto(site.homeUrl)
            .evaluate(function(activeOwlItem) {
                return jQuery(activeOwlItem).length
            },aux.activeOwlItem)
            .then(function (owlItems) {
                expect(owlItems).toBe(aux.carousels);
                done();
            })

    }, aux.specTime);

    it("all callout blocks display", function(done) {
        
        browser
            .evaluate(function(calloutSelector) {
                return jQuery(calloutSelector).length;
            },aux.calloutSelector)
            .then(function (callouts) {
                expect(callouts).toBe(aux.callouts);
                done();
            })

    }, aux.specTime);


});