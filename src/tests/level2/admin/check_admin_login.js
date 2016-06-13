var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var replace = require('replace');
var site = require('../../../setup/config/website.js');
var aux = require('./aux.js');

describe("Admin", function() {
       
    beforeAll(function() { 
        xvfb.start();
        browser = nightmare(site.electronOptions);  
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Log into admin and ensure that the dashboard displays */
    it("frontend login successful", function(done) {

        browser
            .goto(site.adminUrl)
            .type(aux.adminLoginInput.user, site.adminLogin.user)
            .type(aux.adminLoginInput.pass, site.adminLogin.pass)
            .click(aux.adminLoginButton)
            .wait(aux.adminDashboard)
            .title()
            .then(function (title) {
                expect(title).toBe('Dashboard / Magento Admin');
                done();
            })

    }, aux.specTime);


});


