var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../setup/site/website.js');
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

    /* Ensure that at most 5 social icons display */
    it("max 5 social links display", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(socialBlock) {
                vis = 0;
                jQuery(socialBlock).children().each(function() {
                    if(jQuery(this).is(':visible')) {
                        vis++;
                    }
                })
                return vis;
            },aux.socialBlock)
            .then(function (visible) { 
                expect(visible).toBeLessThan(aux.socialLinks+1);
                done();
            })

    }, aux.specTime);

    /* Ensure the barter accordion block has six tabs, and that none
    of the tabs are expanded on page load */
    it("barter accordion displays six collapsed tabs", function(done) {

        browser
            .evaluate(function(barterLinksColumn, barterLinksExpanded) {
                tabs = [];
                tabs.push(jQuery(barterLinksColumn).length);
                tabs.push(jQuery(barterLinksExpanded).length);
                return tabs;
            },aux.barterLinksColumn,aux.barterLinksExpanded)
            .then(function (tabs) { 
                expect(tabs[0]).toBe(aux.columns);
                expect(tabs[1]).toBe(0);
                done();
            })

    }, aux.specTime);

    /* Ensure the barter accordion tabs expand on click */
    it("accordion tab expands on click", function(done) {

        browser
            .click(aux.lastColumn)
            .evaluate(function(barterLinksExpanded) {
                return jQuery(barterLinksExpanded).length;
            },aux.barterLinksExpanded)
            .then(function (expanded) { 
                expect(expanded).toBe(1);
                done();
            })

    }, aux.specTime);

    /* Ensure the copyright block displays */
    it("Copyright block displays", function(done) {

        browser
            .evaluate(function(copyrightBlock) {
                return jQuery(copyrightBlock).is(':visible');
            },aux.copyrightBlock)
            .then(function (visible) { 
                expect(visible).toBe(true);
                done();
            })

    }, aux.specTime);


});