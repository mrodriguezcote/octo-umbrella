var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../utilities/website.js');
var specTime = 10000;

describe("User", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
        browser.authentication(site.htuser, site.htpass);
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Log into front end and ensure that account is accessible */
    it("is able to log into store front end", function(done) {

        browser
            .goto(site.loginUrl)
            .type(site.siteLoginInput.user, site.siteLogin.user)
            .type(site.siteLoginInput.pass, site.siteLogin.pass)
            .click(site.loginButton)
            .wait(site.accountSidebar)
            .title()
            .then(function (title) {
                expect(title).toBe('My Account')
                done();
            })

    },specTime);


});