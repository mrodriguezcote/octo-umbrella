var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../setup/site/website.js');
var aux = require('./aux.js');

describe("Product Badges", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() {
        browser.end().then(); 
        xvfb.stop(); 
    });

    it("disabled and cache cleared", function(done) {

        browser
            .goto(site.adminUrl)
            .cookies.set(site.adminCookie.name, site.adminCookie.value)
            .goto(aux.adminConfig)
            .select(aux.config.globalEnabled, 0)
            .wait(1000)
            .click(aux.adminSave)
            .wait(aux.adminSaveConfirm)
            .evaluate(function(config) {
                sets = [];
                sets.push(parseInt(jQuery(config.globalEnabled).val()));
                sets.push(jQuery(config.areasSelect).length);
                sets.push(jQuery(config.saleSelect).length);
                sets.push(jQuery(config.newSelect).length);
                return sets;
            },aux.config)     
            .then(function (sets) {
                expect(sets[0]).toBe(0);
                expect(sets[1]).toBe(1);
                expect(sets[2]).toBe(1);
                expect(sets[3]).toBe(1);
            })
            .then(function() {
                browser
                    .goto(site.adminCache)
                    .click(site.cacheFlush)
                    .wait(site.cacheFlushConfirm)
                    .then(function() {
                        done();
                    })
            })

    }, aux.specTime);

    it("do not display in product page", function(done) {
        
        browser
            .goto(site.productUrl)
            .evaluate(function(badgeSelector) {
                return jQuery(badgeSelector).length;
            },aux.badgeSelector)
            .then(function (badges) {
                expect(badges).toBe(0);
                done();
            })

    }, aux.specTime);

    it("do not display in category page", function(done) {
        
        browser
            .goto(site.categoryUrl)
            .evaluate(function(badgeSelector) {
                return jQuery(badgeSelector).length;
            },aux.badgeSelector)
            .then(function (badges) {
                expect(badges).toBe(0);
                done();
            })

    }, aux.specTime);

    it("do not display in cart", function(done) {

        browser
            .goto(site.productUrl)
            .wait(1000)
            .click(site.addToCart)
            .wait(site.addToCartConfirm)
            .goto(site.cartUrl)
            .evaluate(function(badgeSelector) {
                return jQuery(badgeSelector).length;
            },aux.badgeSelector)
            .then(function (badges) {
                expect(badges).toBe(0);
                done();
            })

    }, aux.specTime);




});