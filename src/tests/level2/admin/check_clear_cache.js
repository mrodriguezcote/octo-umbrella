var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../setup/site/website.js');
var aux = require('./aux.js');

describe("Chache", function() {

    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Ensure cache can be cleared through admin without errors*/
    it("can be cleared in admin", function(done) {

        browser
            .goto(site.adminUrl)
            .cookies.set(site.adminCookie.name, site.adminCookie.value)
            .goto(site.adminCache)
            .click(site.cacheFlush)
            .wait(site.cacheFlushConfirm)
            .evaluate(function(msgSelector) {
                return jQuery(msgSelector).text();
            },aux.msgSelector)
            .then(function(msg) {
                expect(msg).toBe(aux.expectedMsg);
                done();
            })

    }, aux.specTime);

});