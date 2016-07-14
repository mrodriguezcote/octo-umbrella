var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var loadtest = require('loadtest');
var site = require('../../../setup/config/website.js');
var aux = require('./aux.js');

describe("Performing site search", function() {

    // beforeAll(function() { 
    //     xvfb.start(); 
    //     browser = nightmare(site.electronOptions);
    //     browser.authentication(site.htuser, site.htpass);
    // });
    
    // afterAll(function() { 
    //     browser.end().then();
    //     xvfb.stop(); 
    // });

    var options = {
        url: 'http://staging.reeds.com/catalogsearch/result/?q=test',
        maxRequests: 100,
    };

    it("maintains performance", function(done) {

        loadtest.loadTest(options, function(error, result) {
            if (error) {
                return console.error('Got an error: %s', error);
            }
            console.log(result);
            done();
        });         

    }, aux.specTime);


});