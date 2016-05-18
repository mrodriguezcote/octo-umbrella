var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var request = require('request');
var site = require('../../website.js');
var aux = require('./aux.js');

describe("Adding", function() {

    beforeAll(function() { 
        xvfb.start(); 
    });

    beforeEach(function() { 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        xvfb.stop(); 
    });

    /* Add a simple product to cart and ensure the cart page loads correctly
    TODO: Add a check for then status is 200 but "exception" or "warning"
    is in the body */
    it("simple product to cart", function(done) {

        browser
            .goto(site.productUrl)
            .wait(1000)
            .click(site.addToCart)
            .wait(site.addToCartConfirm)
            .goto(site.cartUrl)
            .title()
            .end()
            .then(function (response) {
                if(response.code === 404) {
                    fail('404 on cart page with simple');
                    done();
                }                
                else if(response.code === 500) {
                    fail('whitescreen on cart page with simple');
                    done();
                }
                else if(response.code === 200) {
                    done();
                }
            })          

    }, aux.specTime);;

});