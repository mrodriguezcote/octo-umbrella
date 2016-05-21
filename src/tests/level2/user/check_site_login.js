var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../testData/site/website.js');
var aux = require('./aux.js');

describe("User", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
    });

    beforeEach(function() { 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        xvfb.stop(); 
    });

    /* Log into front end and ensure that account is accessible */
    it("is able to log into store front end", function(done) {
        
        browser
            .goto(site.loginUrl)
            .type(aux.siteLoginInput.user, aux.siteLogin.user)
            .type(aux.siteLoginInput.pass, aux.siteLogin.pass)
            .click(aux.loginButton)
            .wait(aux.accountSidebar)
            .title()
            .end()
            .then(function (title) {
                expect(title).toBe('My Account')
                done();
            })

    }, aux.specTime);


});