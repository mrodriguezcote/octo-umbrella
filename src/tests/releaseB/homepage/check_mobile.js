var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../website.js');
var aux = require('./aux.js');

describe("Mobile homepage", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
    });

    beforeEach(function() { 
        browser = nightmare(site.electronMobileOptions); 
    });
    
    afterAll(function() { 
        xvfb.stop(); 
    });

    it("one owl item displays per slider", function(done) {
        
        browser
            .goto(site.homeUrl)
            .wait(5000)
            .evaluate(function(activeOwlItem) {
                return jQuery(activeOwlItem).length
            },aux.activeOwlItem)
            .end()  
            .then(function (owlItems) {
                expect(owlItems).toBe(aux.carousels);
                done();
            })

    }, aux.specTime);

    it("all callout blocks display", function(done) {
        
        browser
            .goto(site.homeUrl)
            .evaluate(function(calloutSelector) {
                return jQuery(calloutSelector).length;
            },aux.calloutSelector)
            .end()  
            .then(function (callouts) {
                expect(callouts).toBe(aux.callouts);
                done();
            })

    }, aux.specTime);


});