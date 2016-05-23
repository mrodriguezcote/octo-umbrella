var site = require('../../../setup/site/website.js');
var aux = require('./aux.js');
var Xray = require('x-ray'), xray = new Xray();
var async = require('async');
var request = require('request');

var scrapedLinks = [];
var badLinks = [];
var goodLinks = [];

describe("Crawler", function() {
    
    /* Use xray to retrieve the href attribute from all a tags */
    it("enough links scraped from homepage", function(done) {

        xray(site.homeUrl, ['a@href'])
        (function(err, hrefs) {
            for(i in hrefs) {
                if(hrefs[i] != undefined) {
                    scrapedLinks.push(hrefs[i])
                }
            }
            expect(scrapedLinks.length).not.toBeLessThan(400);
            done();
        })   

    }, aux.specTime);

    /* Use async to queue up all hrefs, perform a request for each of them
    and ensure no 404 returns from any  */
    it("yields no 404 from any links", function(done) {

        var q = async.queue(function (url, callback) {
            request(url, function (error, response, body) {
                if (response.statusCode == 404) {
                    badLinks.push(url);
                    callback();
                }
                else {
                    goodLinks.push(url);
                    callback();
                }
            })
        }, 10);

        q.push(aux.clean(scrapedLinks))

        q.drain = function() {
            expect(badLinks.length).toBe(0);
            done();
        }

    }, aux.specTime);

});