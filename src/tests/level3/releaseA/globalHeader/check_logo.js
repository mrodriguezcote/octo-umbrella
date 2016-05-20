var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var request = require('request');
var site = require('../../../website.js');
var aux = require('./aux.js');

describe("Main logo", function() {

    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Retrieve the url from the image source and perform an HTTP
    request to ensure the resource is available */
    it("image resource available", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(logo) {
                return jQuery(logo.desktop).attr('src');
            },aux.logo)
            .then(function (imageSrc) {
                expect(imageSrc.length).toBeGreaterThan(0);
                request(imageSrc, function (error, response, body) {
                    if (response.statusCode != 200) {
                        fail('image resource not available')
                        done();
                    }
                    else {
                        done();
                    }
                })
            })

    }, aux.specTime);

    /* Ensure the desktiop version of the logo displays and the mobile 
    version is not visible */
    it("displays desktop version", function(done) {

        browser
            .evaluate(function(logo) {
                vis = [];
                vis.push(jQuery(logo.desktop).is(':visible'));
                vis.push(jQuery(logo.mobile).is(':visible'));
                return vis;
            },aux.logo)
            .then(function (visible) { 
                expect(visible[0]).toBe(true); 
                expect(visible[1]).toBe(false);
                done();
            })

    }, aux.specTime);

    /* Hit a non-homepage page and ensure the main logo links back to
    the homepage */
    it("link available outside homepage", function(done) {

        browser
            .goto(site.productUrl)
            .evaluate(function(logo) {
                return jQuery(logo.main).attr('href');
            },aux.logo)
            .then(function (link) { 
                expect(link).toBe(site.homeUrl) 
                done();
            })

    }, aux.specTime);

});