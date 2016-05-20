var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../website.js');
var aux = require('./aux.js');

describe("Mobile", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronMobileOptions); 
    });
    
    afterAll(function() {
        browser.end().then(); 
        xvfb.stop(); 
    });

    /* Ensure the mobile version of the logo displays and the desktop 
    version does not display */
    it("logo displays", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(logo) {
                vis = [];
                vis.push(jQuery(logo.desktop).is(':visible'));
                vis.push(jQuery(logo.mobile).is(':visible'));
                return vis;
            },aux.logo)
            .then(function (visible) { 
                expect(visible[0]).toBe(false); 
                expect(visible[1]).toBe(true);
                done();
            })

    }, aux.specTime);

    /* Ensure the hamburger menu is visible */
    it("hamburger menu displays", function(done) {

        browser
            .evaluate(function(hamburger) {
                return jQuery(hamburger).is(':visible');
            },aux.hamburger)
            .then(function (visible) { 
                expect(visible).toBe(true);
                done();
            })

    }, aux.specTime);

});