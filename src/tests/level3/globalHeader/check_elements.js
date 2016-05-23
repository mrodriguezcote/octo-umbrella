var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var async = require("async");
var site = require('../../../setup/site/website.js');
var aux = require('./aux.js');

var settings = {};

describe("Global Header", function() {

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
            .goto(aux.adminHeader)
            .evaluate(function(adminChatEnabled, adminPhone, adminStoreLocator, adminReedsCard) {
                set = [];
                set.push(parseInt(jQuery(adminChatEnabled).val()));
                set.push(parseInt(jQuery(adminPhone.enabled).val()));
                set.push(jQuery(adminPhone.selected).text());
                set.push(parseInt(jQuery(adminStoreLocator.enabled).val()));
                set.push(jQuery(adminStoreLocator.title).val());
                set.push(parseInt(jQuery(adminReedsCard.enabled).val()));
                set.push(jQuery(adminReedsCard.title).val());
                set.push(jQuery(adminReedsCard.block).text());
                set.push(jQuery(adminReedsCard.page).text());
                return set; 
            },aux.adminChatEnabled,aux.adminPhone,aux.adminStoreLocator,aux.adminReedsCard)
            .then(function (set) {
                settings = {
                    chatEnabled: set[0],
                    phoneEnabled: set[1],
                    phonePage: set[2],
                    locatorEnabled: set[3],
                    locatorTitle: set[4],
                    cardEnabled: set[5],
                    cardTitle: set[6],
                    cardBlock: set[7],
                    cardPage: set[8]
                }
                expect(settings).toBeDefined;
                done();
            })

    }, aux.specTime);

    /* Ensure each of the links that are enabled display */
    it("enabled links display", function(done) {

        async.series([
            function(callback) {
                browser
                    .goto(site.homeUrl)
                    .evaluate(function(headerLinks) {
                        state = [];
                        state.push(jQuery(headerLinks.chat).length);
                        state.push(jQuery(headerLinks.phone).length);
                        state.push(jQuery(headerLinks.storeLocator).length);
                        state.push(jQuery(headerLinks.reedsCard).length);
                        return state;
                    },aux.headerLinks)
                    .then(function (linksVisible) {
                        callback(null, linksVisible);
                    })
            }],
            function(err, results) {
                linkStates = results[0];

                if(settings.chatEnabled) { expect(linkStates[0]).toBe(1); }
                else { expect(linkStates[0]).toBe(0) }

                if(settings.phoneEnabled) { expect(linkStates[1]).toBe(1); }
                else { expect(linkStates[1]).toBe(0) }

                if(settings.locatorEnabled) { expect(linkStates[2]).toBe(1); }
                else { expect(linkStates[2]).toBe(0) }

                if(settings.cardEnabled) { expect(linkStates[3]).toBe(1); }
                else { expect(linkStates[3]).toBe(0) }
                done();
            })

    }, aux.specTime);

    /* Click the phone link and ensure the correct page loads. */
    it("phone link directs to correct page", function(done) {

        browser
            .click(aux.phoneLink)
            .wait()
            .title()
            .then(function (title) {
                if(settings.phoneEnabled) { 
                    expect(title).toBe(settings.phonePage); 
                }
            })
            .then(function() {
                browser.back();
                done();
            })

    }, aux.specTime);

    /* Ensure that the store locator dropdown displays the title set
    in configuration */
    it("locator dropdown contains correct title", function(done) {

        browser
            .evaluate(function(headerLinks) {
                return jQuery(jQuery(headerLinks.storeLocator).children()[1].children[1]).text();
            },aux.headerLinks)
            .then(function (title) {
                if(settings.locatorEnabled) { 
                    expect(title).toBe(settings.locatorTitle); 
                }
                done();
            })

    }, aux.specTime);

    /* Click the Reeds CC link and ensure the correct page loads. */
    it("card link directs to correct page", function(done) {

        browser
            .click(aux.cardLink)
            .wait()
            .title()
            .then(function (title) {
                if(settings.cardEnabled) { 
                    expect(title).toBe(settings.cardPage); 
                }
            })
            .then(function() {
                browser.back();
                done();
            })

    }, aux.specTime);

    /* Ensure that the Reeds CC dropdown displays the title set
    in configuration */
    it("card dropdown contains correct title", function(done) {

        browser
            .evaluate(function(headerLinks) {
                return jQuery(jQuery(headerLinks.reedsCard).children()[1].children[1]).text();
            },aux.headerLinks)
            .then(function (title) {
                if(settings.cardEnabled) { 
                    expect(title).toBe(settings.cardTitle);
                }
                done();
            })

    }, aux.specTime);

    /* Ensure the search field contains correct place holder text */
    it("search field contains correct placehoder", function(done) {

        browser
            .evaluate(function(searchField) {
                return jQuery(jQuery(searchField).children()[0].children[1].children[0]).attr('placeholder');
            },aux.searchField)
            .then(function (text) {
                expect(text).toBe(aux.searchText);
                done();
            })

    }, aux.specTime);

});