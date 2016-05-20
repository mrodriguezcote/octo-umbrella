var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var async = require("async");
var request = require('request');
var site = require('../../../website.js');
var aux = require('./aux.js');

describe("Homepage", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    it("all carousels display", function(done) {
        
        browser
            .goto(site.homeUrl)
            .evaluate(function(owlSelector) {
                return jQuery(owlSelector).length;
            },aux.owlSelector)
            .then(function (owls) {
                expect(owls).toBe(aux.carousels);
                done();
            })

    }, aux.specTime);

    it("sliders contain enough active items", function(done) {
        
        browser
            .wait(4000)
            .evaluate(function(activeOwlItem) {
                return jQuery(activeOwlItem).length
            },aux.activeOwlItem)
            .then(function (owlItems) {
                expect(owlItems).toBe((aux.carousels*5)-4);
                done();
            })

    }, aux.specTime);

    it("all image resources available", function(done) {
        
        browser
            .evaluate(function(imagesSelector) {
                imgs = [];
                jQuery(imagesSelector).each(function() {
                    imgs.push(this.src)
                })
                return imgs;
            },aux.imagesSelector)
            .then(function (images) {
                var badImages = [];
                var goodImages = [];

                var q = async.queue(function (url, callback) {
                    request(url, function (error, response, body) {
                        if (response.statusCode != 200) {
                            badImages.push(url);
                            callback();
                        }
                        else {
                            goodImages.push(url);
                            callback();
                        }
                    })
                }, 10);

                q.drain = function() {
                    expect(goodImages.length).toBe(images.length);
                    done();
                }

                q.push(images)
            })

    }, aux.specTime);

    it("all callout blocks display", function(done) {
        
        browser
            .evaluate(function(calloutSelector) {
                return jQuery(calloutSelector).length;
            },aux.calloutSelector)
            .then(function (callouts) {
                expect(callouts).toBe(aux.callouts);
                done();
            })

    }, aux.specTime);


});