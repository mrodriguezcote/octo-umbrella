var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var randomstring = require("randomstring");
var site = require('../../website.js');
var aux = require('./aux.js');

var testStoreNum = randomstring.generate( {length: 5, charset: 'alphanumeric'} );


describe("Associate Orders modal", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
    });

    beforeEach(function() { 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        xvfb.stop(); 
    });

    /* Configure browser with store ID, sdd a product to cart, proceed to checkout 
    and ensure that the modal displays */
    it("displays before checkout if cookie is set", function(done) {

        browser
            .goto(aux.storeConfig)
            .type(aux.storeIdField, testStoreNum)
            .click(aux.storeIdSubmit)
            .wait(3000)
            .goto(site.productUrl)
            .wait(1000)
            .click(site.addToCart)
            .wait(site.addToCartConfirm)
            .goto(site.checkoutUrl)
            .wait(1000)
            .evaluate(function(modalTitle) {
                return jQuery(modalTitle).text()
            },aux.modalTitle)
            .end()
            .then(function (title) {
                expect(title).toBe("Store # "+testStoreNum);
                done();
            })

    }, aux.specTime);

    /* Add a product to cart, proceed to checkout and ensure that the modal does
    not display since there is no cookie set */
    it("does not display if cookie is not set", function(done) {

        browser
            .goto(site.productUrl)
            .wait(1000)
            .click(site.addToCart)
            .wait(site.addToCartConfirm)
            .goto(site.checkoutUrl)
            .wait(3000)
            .evaluate(function(modalTitle) {
                return jQuery(modalTitle).is(':visible');
            },aux.modalTitle)
            .end()
            .then(function (modalVisible) {
                expect(modalVisible).toBe(false);
                done();
            })

    }, aux.specTime);


});