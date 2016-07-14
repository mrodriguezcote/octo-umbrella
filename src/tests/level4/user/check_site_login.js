var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../setup/config/website.js');
var aux = require('./aux.js');

describe("User", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Log into front end and ensure that account is accessible */
    it("is able to log into store front end", function(done) {
        
        browser
            .goto(site.loginUrl)
            .type(aux.siteLoginInput.user, site.siteLogin.user)
            .type(aux.siteLoginInput.pass, site.siteLogin.pass)
            .click(aux.loginButton)
            .wait(aux.accountSidebar)
            .title()
            .then(function (title) {
                expect(title).toBe('My Account')
                done();
            })

    }, aux.specTime);


});