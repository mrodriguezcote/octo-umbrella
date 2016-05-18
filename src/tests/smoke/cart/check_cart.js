var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var request = require('request');
var site = require('../../website.js');
var aux = require('./aux.js');

describe("Cart page", function() {

    /* Hit the empty cart page and ensure it loads correctly */
    it("loads successfully when empty", function(done) {

        request(site.cartUrl, function(error, response, body) {
            if(response.statusCode === 500) {
                fail('whitescreen on cart page');
                done();
            }
            else if(response.statusCode === 404) {
                fail('404 on cart page');
                done();
            }
            else if(response.statusCode === 200) {
                var flag = body.split(" ")[0];
                if(flag == 'exception' || flag == 'Exception') {
                    fail('whitescreen on cart page');
                    done();
                }
                else {
                    done();
                }
            }
        })

    }, aux.specTime);

    /* Add a product to cart and endure the cart page loads correctly
    TODO: Add a check for then status is 200 but "exception" or "warning"
    is in the body */
    it("loads successfully with items", function(done) {

        xvfb.start(function() {
            browser = nightmare(site.electronOptions);
            browser
                .goto(site.productUrl)
                .wait(1000)
                .click(site.addToCart)
                .wait(site.addToCartConfirm)
                .goto(site.cartUrl)
                .end()
                .then(function (response) {
                    if(response.code === 500) {
                        xvfb.stop();
                        fail('whitescreen on cart page');
                        done();
                    }
                    else if(response.code === 404) {
                        xvfb.stop();
                        fail('404 on cart page');
                        done();
                    }
                    else {
                        xvfb.stop();
                        done();
                    }
                })          
        });


    }, aux.specTime);;

});