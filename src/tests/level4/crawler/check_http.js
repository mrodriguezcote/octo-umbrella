var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var async = require('async');
var request = require('request');
var site = require('../../../utilities/website.js');
var helpers = require('../../../utilities/helpers.js');
var specTime = 15000;

var scrapedLinks = [];
var badLinks = [];
var goodLinks = [];

describe("Crawler", function() {

    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
        browser.authentication(site.htuser, site.htpass);
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Ensure the cart page display */
    it("enough links scraped from homepage", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function() {
                hrefs = [];
                jQuery('a').each(function() {
                    hrefs.push(this.href);
                })
                return hrefs;
            })
            .then(function (hrefs) {
                scrapedLinks = hrefs;
                expect(scrapedLinks.length).toBeGreaterThan(site.minLinks);
                done();
            })          

    },specTime);

    /* Use async to queue up all hrefs, perform a request for each of them
    and ensure no 404 returns from any  */
    it("yields no 404 from any links", function(done) {

        var q = async.queue(function (url, callback) {
            request(url, function (error, response, body) {
                if (response.statusCode == 404 || response.statusCode == 500) {
                    badLinks.push(url);
                    callback();
                }
                else {
                    goodLinks.push(url);
                    callback();
                }
            }).auth(site.htuser, site.htpass)
        }, 10);

        q.push(helpers.clean(scrapedLinks))

        q.drain = function() {
            expect(badLinks.length).toBe(0);
            done();
        }

    },specTime);

});