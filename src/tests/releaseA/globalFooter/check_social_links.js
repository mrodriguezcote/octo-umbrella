var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../website.js');
var aux = require('./aux.js');

/* Click each social link and make sure the URL of the current
page remmains the RDS homepage URL */
describe("Social Links", function() {

    beforeAll(function() { 
        xvfb.start(); 
    });

    beforeEach(function() { 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        xvfb.stop(); 
    });

    it("Facebook link opens in different tab", function(done) {

        browser
            .goto(site.homeUrl)
            .click(aux.facebookSelector)
            .url()
            .end()
            .then(function(url) {
                expect(url).toBe(site.homeUrl);
                done();
            })

    }, aux.specTime);

    it("Pinterest link opens in different tab", function(done) {

        browser
            .goto(site.homeUrl)
            .click(aux.pinterestSelector)
            .url()
            .end()
            .then(function(url) {
                expect(url).toBe(site.homeUrl);
                done();
            })

    }, aux.specTime);

    it("Twitter link opens in different tab", function(done) {

        browser
            .goto(site.homeUrl)
            .click(aux.twitterSelector)
            .url()
            .end()
            .then(function(url) {
                expect(url).toBe(site.homeUrl);
                done();
            })

    }, aux.specTime);

    it("Youtube link opens in different tab", function(done) {

        browser
            .goto(site.homeUrl)
            .click(aux.youtubeSelector)
            .url()
            .end()
            .then(function(url) {
                expect(url).toBe(site.homeUrl);
                done();
            })

    }, aux.specTime);

    it("Instagram link opens in different tab", function(done) {

        browser
            .goto(site.homeUrl)
            .click(aux.instagramSelector)
            .url()
            .end()
            .then(function(url) {
                expect(url).toBe(site.homeUrl);
                done();
            })

    }, aux.specTime);

    it("Google Plus link opens in different tab", function(done) {

        browser
            .goto(site.homeUrl)
            .click(aux.googleplusSelector)
            .url()
            .end()
            .then(function(url) {
                expect(url).toBe(site.homeUrl);
                done();
            })

    }, aux.specTime);

    it("Wanelo link opens in different tab", function(done) {

        browser
            .goto(site.homeUrl)
            .click(aux.waneloSelector)
            .url()
            .end()
            .then(function(url) {
                expect(url).toBe(site.homeUrl);
                done();
            })

    }, aux.specTime);

})