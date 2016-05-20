var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../website.js');
var aux = require('./aux.js');

describe("Mobile carousel", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronMobileOptions);
    });
    
    afterAll(function() {
        browser.end().then(); 
        xvfb.stop(); 
    });

    /* Ensure mobile brand manager block displays if enabled */
    it("single brand displays in brand manager if enabled", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(brandsBlock, activeBrands) {
                vis = [];
                vis.push(jQuery(brandsBlock).length);
                vis.push(jQuery(brandsBlock).find(activeBrands).length);
                return vis;
            },aux.brandsBlock,aux.activeBrands)
            .then(function (visible) { 
                if(visible[0] == 1) {
                    expect(visible[1]).toBe(1);
                    done();                    
                }
                else {
                    fail('brand manager does not display. Could be disabled');
                    done();
                }

            })

    }, aux.specTime);


});