var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../website.js');
var aux = require('./aux.js');

describe("Adding product to cart", function() {

    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
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

    }, aux.specTime);

    /* Ensure the item url is in the cart */
    it("item is in cart", function(done) {

        browser
            .evaluate(function(itemInfo) {
                return jQuery(itemInfo).children()[0].children[0].href+'/';
            },aux.itemInfo)
            .then(function (info) {
                expect(info).toBe(site.productUrl);
                done();
            })          

    }, aux.specTime);

    /* Ensure the mini cart badge count updates */
    it("mini cart count updates", function(done) {

        browser
            .evaluate(function(counterLabel) {
                return parseInt(jQuery(counterLabel).text().trim().charAt(0));
            },aux.counterLabel)
            .then(function (count) {
                expect(count).toBe(1);
                done();
            })          

    }, aux.specTime);

});