var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var async = require("async");
var request = require('request');
var site = require('../../website.js');
var aux = require('./aux.js');

var enabled;

describe("Brand Manager", function() {

    beforeAll(function() { 
        xvfb.start(); 
    });

    beforeEach(function() { 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        xvfb.stop(); 
    });

    /* Hit the admin configuration page, ensure the settings are
    accessible and disable the block */
    it("disabled and cache cleared", function(done) {

        browser
            .goto(site.adminUrl)
            .cookies.set(site.adminCookie.name, site.adminCookie.value)
            .goto(aux.adminFooter)
            .select(aux.adminBrandsEnabled, 0)
            .wait(1000)
            .click(aux.adminSave)
            .wait(aux.adminSaveConfirm)
            .evaluate(function(adminBrandsEnabled) {
                return parseInt(jQuery(adminBrandsEnabled).val());
            },aux.adminBrandsEnabled)
            .then(function (set) {
                expect(set).toBe(0);
            })
            .then(function() {
                browser
                    .goto(site.adminCache)
                    .click(site.cacheFlush)
                    .wait(site.cacheFlushConfirm)
                    .end()
                    .then(function() {
                        done();
                    })
            })

    }, aux.specTime);

    /* If the block is disabled ensure the widget does not get insterted */
    it("carousel does not display when disabled", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(brandsWidget) {
                return jQuery(brandsWidget).siblings().length;
            },aux.brandsWidget)
            .end()
            .then(function (visible) {
                expect(visible).toBe(0);
                done();
            })

    }, aux.specTime);

    /* Hit the admin configuration page, ensure the settings are
    accessible and enable the block */
    it("enabled and cache cleared", function(done) {

        browser
            .goto(site.adminUrl)
            .cookies.set(site.adminCookie.name, site.adminCookie.value)
            .goto(aux.adminFooter)
            .select(aux.adminBrandsEnabled, 1)
            .wait(1000)
            .click(aux.adminSave)
            .wait(aux.adminSaveConfirm)
            .evaluate(function(adminBrandsEnabled) {
                return parseInt(jQuery(adminBrandsEnabled).val());
            },aux.adminBrandsEnabled)
            .then(function (set) {
                expect(set).toBe(1);
            })
            .then(function() {
                browser
                    .goto(site.adminCache)
                    .click(site.cacheFlush)
                    .wait(site.cacheFlushConfirm)
                    .end()
                    .then(function() {
                        done();
                    })                
            })

    }, aux.specTime);

    /* Ensure the carousel displays and it contains at least 5 brand blocks */
    it("carousel displays with at least 5 brands", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(brandsBlock, activeBrands) {
                vis = [];
                vis.push(jQuery(brandsBlock).length);
                vis.push(jQuery(brandsBlock).find(activeBrands).length);
                return vis;
            },aux.brandsBlock,aux.activeBrands)
            .end()
            .then(function (visible) {
                expect(visible[0]).toBe(1); 
                expect(visible[1]).toBe(aux.minBrands); 
                done();
            })

    }, aux.specTime);

    /* Retrieve image resource URLs from each of the brands (default image 
    and hover image) and ensure all image resources are available */
    it("image resources available", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(brandImage) {
                imgSrcs = [];
                jQuery(brandImage).each(function() {
                    imgSrcs.push(this.children[0].src);
                    imgSrcs.push(this.children[1].src);
                })
                return imgSrcs;
            },aux.brandImage)
            .end()
            .then(function (imgSrcs) {
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
                    expect(goodImages.length).toBe(imgSrcs.length);
                    done();
                }

                q.push(imgSrcs) 
            })

    }, aux.specTime);

    /* Retireve the dimentions of the brand manager block and ensure 
    they are the correct width and height */
    it("carousel dimensions maintained", function(done) {

        browser
            .goto(site.homeUrl)
            .evaluate(function(brandsBlock) {
                dim = [];
                dim.push(jQuery(brandsBlock).height());
                dim.push(jQuery(brandsBlock).width());
                return dim;
            },aux.brandsBlock)
            .end()
            .then(function (dimensions) {
                expect(dimensions[0]).toBe(aux.brandsHeight); 
                expect(dimensions[1]).toBe(aux.brandsWidth);
                done();
            })

    }, aux.specTime);


})