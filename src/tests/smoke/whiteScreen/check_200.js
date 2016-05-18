var site = require('../../website.js');
var aux = require('./aux.js');
var request = require('request');

/* Perform an HTTP request from each of the main pages and ensure that the body does
not begin with "exception" which is the case when a white screen displays even if the 
HTTP request was successful */
//TODO: Combine 500 and 200 tests
describe("No 200 whitescreen", function() {
   
    it("on homepage", function(done) {

        request(site.homeUrl, function(error, response, body) {
            var flag = body.split(" ")[0];
            if(flag == 'exception' || flag == 'Exception') {
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
            var flag = body.split(" ")[0];
            if(flag == 'exception' || flag == 'Exception') {
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
            var flag = body.split(" ")[0];
            if(flag == 'exception' || flag == 'Exception') {
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
            var flag = body.split(" ")[0];
            if(flag == 'exception' || flag == 'Exception') {
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
            var flag = body.split(" ")[0];
            if(flag == 'exception' || flag == 'Exception') {
                fail('whitescreen on product page');
                done();
            }
            else {
                done();
            }
        })

    }, aux.specTime);


});