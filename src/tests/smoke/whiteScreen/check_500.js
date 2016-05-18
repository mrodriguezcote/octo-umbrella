var site = require('../../website.js');
var aux = require('./aux.js');
var request = require('request');

/* Perform an HTTP request from each of the main pages and make sure
none return 500 status */
//TODO: Combine 500 and 200 tests
describe("No 500 whitescreen", function() {
   
    it("on homepage", function(done) {

        request(site.homeUrl, function(error, response, body) {
            if(response.statusCode == 500) {
                fail('whitescreen on homepage');
                done();
            }
            else {
                done();
            }
        })

    }, aux.specTime);

    it("on admin", function(done) {

        request(site.adminUrl, function(error, response, body) {
            if(response.statusCode == 500) {
                fail('whitescreen on admin');
                done();
            }
            else {
                done();
            }
        })

    }, aux.specTime);

    it("on login page", function(done) {

        request(site.loginUrl, function(error, response, body) {
            if(response.statusCode === 500) {
                fail('whitescreen on login page');
                done();
            }
            else {
                done();
            }
        })

    }, aux.specTime);

    it("on category page", function(done) {

        request(site.categoryUrl, function(error, response, body) {
            if(response.statusCode === 500) {
                fail('whitescreen on category page');
                done();
            }
            else {
                done();
            }
        })

    }, aux.specTime);

    it("on product page", function(done) {

        request(site.productUrl, function(error, response, body) {
            if(response.statusCode === 500) {
                fail('whitescreen on product page');
                done();
            }
            else {
                done();
            }
        })

    }, aux.specTime);


});