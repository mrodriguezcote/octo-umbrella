var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../testData/site/website.js');
var aux = require('./aux.js');

var settings = {};

describe("Disabled short URLs", function() {

    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* The first series function hits the admin configuration page, disables
    the feature and sets a fallback page that is enabled. The second series
    function clears cache
    TODO: Need to replace the second series function with a php script execution
    that will clear cache withut going through the front end */
    it("feature disabled with enabled fallback and cache cleared", function(done) {

        browser
            .goto(site.adminUrl)
            .cookies.set(site.adminCookie.name, site.adminCookie.value)
            .goto(aux.adminShortUrls)
            .select(aux.config.enabled, 0)
            .select(aux.config.fallback, aux.fallback.key)
            .wait(1000)
            .click(aux.adminSave)
            .wait(aux.adminSaveConfirm)
            .evaluate(function(config) {
                sets = [];
                sets.push(parseInt(jQuery(config.enabled).val())); 
                sets.push(jQuery(config.prodNamespace).val()+'/');
                sets.push(jQuery(config.catNamespace).val()+'/');
                return sets;
            },aux.config)
            .then(function(sets) {
                expect(sets[0]).toBe(0);
                settings = {
                    prodNamespace : sets[1],
                    catNamespace: sets[2],
                }
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

    /* Hit the product namespace and ensure the correct page displays */
    it("loads correct product page", function(done) {

        browser
            .goto(site.homeUrl+settings.prodNamespace+aux.shortProduct.sku)
            .title()
            .then(function(pageTitle) {
                expect(pageTitle).toBe(aux.fallback.title);
                done();
            })  

    }, aux.specTime);

    /* Hit the category namespace and ensure the correct page displays */
    it("loads correct category page", function(done) {

        browser
            .goto(site.homeUrl+settings.catNamespace+aux.shortCategory.id)
            .title()
            .then(function(pageTitle) {
                expect(pageTitle).toBe(aux.fallback.title);
                done();
            })  

    }, aux.specTime);

    /* The first series function hits the admin configuration page, disables
    the feature and sets a fallback page that is disabled. The second series
    function clears cache
    TODO: Need to replace the second series function with a php script execution
    that will clear cache withut going through the front end */
    it("feature disabled with disabled fallback and cache cleared", function(done) {

        browser
            .goto(aux.adminShortUrls)
            .select(aux.config.enabled, 0)
            .select(aux.config.fallback, aux.disabledFallback.key)
            .wait(1000)
            .click(aux.adminSave)
            .wait(aux.adminSaveConfirm)
            .evaluate(function(config) {
                sets = [];
                sets.push(parseInt(jQuery(config.enabled).val())); 
                sets.push(jQuery(config.prodNamespace).val()+'/');
                sets.push(jQuery(config.catNamespace).val()+'/');
                return sets;
            },aux.config)
            .then(function(sets) {
                expect(sets[0]).toBe(0);
                settings = {
                    prodNamespace : sets[1],
                    catNamespace: sets[2],
                }  
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

    /* Hit the product and category namespaces and ensure the 404 page displays */
    it("loads correct pages", function(done) {

        browser
            .goto(site.homeUrl+settings.prodNamespace+aux.shortProduct.sku)
            .title()
            .then(function(pageTitle) {
                expect(pageTitle).toBe('404 Not Found');
            })
            .then(function() {
                browser
                    .goto(site.homeUrl+settings.catNamespace+aux.shortCategory.id)
                    .title()
                    .then(function(pageTitle) {
                        expect(pageTitle).toBe('404 Not Found');
                        done();
                    }) 
            })

    }, aux.specTime);

});
