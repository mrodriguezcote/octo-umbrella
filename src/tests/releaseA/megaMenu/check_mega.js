var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var async = require("async");
var request = require('request');
var site = require('../../website.js');
var aux = require('./aux.js');

describe("Mega Menu", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Ensure the the mega meny block has the correct height and width */
    it("maximum height and width maintained", function(done) {
        
        browser
            .goto(site.homeUrl)
            .wait(1000)
            .evaluate(function(megaSelector) {
                dims = [];
                dims.push(jQuery(megaSelector).height());
                dims.push(jQuery(megaSelector).width()); 
                return dims;
            },aux.megaSelector)
            .then(function (dimensions) {
                expect(dimensions[0]).toBe(aux.megaHeight);
                expect(dimensions[1]).toBe(aux.megaWidth);
                done();
            })

    }, aux.specTime);

    /* Count the top mega menu items, perform an HTTP request from each link and
    ensure no 404 returns from any */
    it("10 items displaying and no 404s from any", function(done) {
        
        browser
            .evaluate(function(topMenu) {
                hrefs = [];
                jQuery(topMenu).each(function() {
                    hrefs.push(this.href)
                })
                return hrefs;
            },aux.topMenu)
            .then(function (hrefs) {
                var badLinks = [];
                var goodLinks = [];

                var q = async.queue(function (url, callback) {
                    request(url, function (error, response, body) {
                        if (response.statusCode != 200) {
                            badLinks.push(url);
                            callback();
                        }
                        else {
                            goodLinks.push(url);
                            callback();
                        }
                    })
                }, 10);

                q.drain = function() {
                    expect(hrefs.length).toBe(aux.maxItems);
                    expect(goodLinks.length).toBe(hrefs.length);
                    done();
                }

                q.push(hrefs)
            }) 

    }, aux.specTime);

    /* Retrieve the url of each of the mega menu images, perform an http request 
    from each and ensure no 404 returns from any */
    it("all image resources available", function(done) {
        
        browser
            .evaluate(function(imageSelector) {
                images = [];
                jQuery(imageSelector).each(function() {
                    images.push(this.children[0].children[0].src)
                })
                return images;
            },aux.imageSelector)
            .then(function (images) {
                var badLinks = [];
                var goodLinks = [];

                var q = async.queue(function (url, callback) {
                    request(url, function (error, response, body) {
                        if (response.statusCode != 200) {
                            badLinks.push(url);
                            callback();
                        }
                        else {
                            goodLinks.push(url);
                            callback();
                        }
                    })
                }, 10);

                q.drain = function() {
                    expect(goodLinks.length).toBe(images.length);
                    done();
                }

                q.push(images)
            }) 

    }, aux.specTime);



});