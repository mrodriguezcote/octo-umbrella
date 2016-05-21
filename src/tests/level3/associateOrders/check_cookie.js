var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var randomstring = require("randomstring");
var site = require('../../../testData/site/website.js');
var aux = require('./aux.js');

var testStoreNum = randomstring.generate( {length: 5, charset: 'alphanumeric'} );
var cookieName;


describe("Associate Orders cookie", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() {
        browser.end().then(); 
        xvfb.stop(); 
    });

    /* Check the admin configuration page and ensure the settings are 
    accessible */
    it("configuration is in place", function(done) {
        
        browser
            .goto(site.adminUrl)
            .cookies.set(site.adminCookie.name, site.adminCookie.value)
            .goto(aux.adminConfig)
            .evaluate(function(adminCookieName) {
                return jQuery(adminCookieName).val();
            },aux.adminCookieName)
            .then(function (config) {
                cookieName = config;
                expect(config).toBeDefined();
                done();
            })

    }, aux.specTime);

    /* Configure the browser with a store ID and make sure that a cookie
    with the correct name and value get set */
    it("is set correctly", function(done) {
      
        browser
            .goto(aux.storeConfig)
            .wait(500)
            .type(aux.storeIdField, testStoreNum)
            .click(aux.storeIdSubmit)
            .wait(1000)
            .cookies.get(cookieName)
            .then(function (cookie) {
                expect(cookie.value).toEqual(testStoreNum);
                done();
            })

    }, aux.specTime);

});