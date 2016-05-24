var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../setup/config/website.js');
var aux = require('./aux.js');

var settings = {};

describe("Global Footer", function() {

    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Hit the admin configuration page and ensure the settings are
    accessible */
    it("configuration available", function(done) {

        browser
            .goto(site.adminUrl)
            .cookies.set(site.adminCookie.name, site.adminCookie.value)
            .goto(aux.adminFooter)
            .evaluate(function(adminSocialEnabled, adminSocialUrls) {
                set = [];
                set.push(parseInt(jQuery(adminSocialEnabled).val()));
                set.push(jQuery(adminSocialUrls.facebook).val());
                set.push(jQuery(adminSocialUrls.pinterest).val());
                set.push(jQuery(adminSocialUrls.twitter).val());
                set.push(jQuery(adminSocialUrls.youtube).val());
                set.push(jQuery(adminSocialUrls.instagram).val());
                set.push(jQuery(adminSocialUrls.gplus).val());
                set.push(jQuery(adminSocialUrls.wanelo).val());
                return set; 
            },aux.adminSocialEnabled,aux.adminSocialUrls)
            .then(function (set) {
                settings = {
                    socialEnabled: set[0],
                    facebookUrl: set[1],
                    pinterestUrl: set[2],
                    twitterUrl: set[3],
                    youtubeUrl: set[4],
                    instagramUrl: set[5],
                    googleplusUrl: set[6],
                    waneloUrl: set[7]
                }
                expect(settings).toBeDefined;
                done();
            })

    }, aux.specTime);

    /* If the social block is enabled, ensure it displays */
    it("social block displays if enabled", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(socialBlock) {
                return jQuery(socialBlock).length;
            },aux.socialBlock)
            .then(function (visible) {
                if(settings.socialEnabled) { 
                    expect(visible).toBe(1); 
                    done();
                }
                else {
                    expect(visible).toBe(0);
                    done();
                }
            })

    }, aux.specTime);

    /*TODO: Once official social URLs are in place, need to write a test that the
    correct URLs are configured */

    /* Ensure the newsletter field contains correct placeholder text */
    it("newsletter field contains correct placeholder", function(done) {

        browser
            .evaluate(function(newsletterField) {
                return jQuery(newsletterField).attr('placeholder');
            },aux.newsletterField)
            .then(function (text) { 
                expect(text).toBe(aux.newsletterText);
                done();
            })

    }, aux.specTime);

    /* Ensure the footer links display in six columns */
    it("footer links display in six columns", function(done) {

        browser
            .evaluate(function(footerLinksBlock) {
                return jQuery(footerLinksBlock).children().length;
            },aux.footerLinksBlock)
            .then(function (cols) { 
                expect(cols).toBe(aux.columns);
                done();
            })

    }, aux.specTime);

    /* Ensure the zip code field contains correct placeholder text */
    it("zip code field contains correct placeholder", function(done) {

        browser
            .evaluate(function(zipField) {
                return jQuery(jQuery(zipField).children()[0]).attr('placeholder');
            },aux.zipField)
            .then(function (text) { 
                expect(text).toBe(aux.footerZipText);
                done();
            })

    }, aux.specTime);

})