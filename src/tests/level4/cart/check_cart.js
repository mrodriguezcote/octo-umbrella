var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../utilities/website.js');
var specTime = 15000;

describe("Adding product to cart", function() {

    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions);
        browser.authentication(site.htuser, site.htpass);
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Ensure the cart page display */
    it("page loads", function(done) {

        browser
            .goto(site.productUrl)
            .wait(1000)
            .click(site.addToCart)
            .wait(site.addToCartConfirm)
            .goto(site.cartUrl)
            .title()
            .then(function (title) {
                expect(title).toBe('Shopping Cart');
                done();
            })          

    },specTime);

    /* Ensure the item url is in the cart */
    it("item is in cart", function(done) {

        browser
            .evaluate(function(itemInfo) {
                return jQuery(itemInfo).children()[0].href;
            },site.itemInfo)
            .then(function (info) {
                expect(info).toBe(site.productUrl);
                done();
            })          

    },specTime);

});