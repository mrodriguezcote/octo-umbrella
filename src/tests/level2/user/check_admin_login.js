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

    /* Log into admin and ensure that the dashboard displays */
    it("is able to log into admin", function(done) {

            browser
                .goto(site.adminUrl)
                .type(aux.adminLoginInput.user, aux.adminLogin.user)
                .type(aux.adminLoginInput.pass, aux.adminLogin.pass)
                .click(aux.adminLoginButton)
                .wait(aux.adminDashboard)
                .title()
                .end()
                .then(function (title) {
                    expect(title).toBe('Dashboard / Magento Admin');
                    xvfb.stop();
                    done();
                })

    }, aux.specTime);

});


