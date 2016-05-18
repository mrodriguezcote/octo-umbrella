var site = require('../../website.js');
var aux = require('./aux.js');
var request = require('request');

/* Perform an HTTP request from each of the main pages and ensure no
whitescreens of 404s from any */
describe("No load problems", function() {
   
    it("on homepage", function(done) {

        request(site.homeUrl, function(error, response, body) {
            if(response.statusCode == 404) {
                fail('404 on homepage');
                done();
            }
            else if(response.statusCode == 500) {
                fail('whitescreen on homepage');
                done();
            }
            else if(response.statusCode == 200) {
            	var flag = body.split(" ")[0];
            	if(flag == 'exception' || flag == 'Exception' ||
            		flag == 'warning' || flag == 'Warning') {
	                fail('exception thrown on homepage');
	                done();	
            	}
	            else {
	                done();
	            }
            }
            else {
            	fail('unusual HTTP status received');
            }
        })

    }, aux.specTime);

    it("on admin", function(done) {

        request(site.adminUrl, function(error, response, body) {
            if(response.statusCode == 404) {
                fail('404 on admin');
                done();
            }
            else if(response.statusCode == 500) {
                fail('whitescreen on admin');
                done();
            }
            else if(response.statusCode == 200) {
            	var flag = body.split(" ")[0];
            	if(flag == 'exception' || flag == 'Exception' ||
            		flag == 'warning' || flag == 'Warning') {
	                fail('exception thrown on admin');
	                done();	
            	}
	            else {
	                done();
	            }
            }
            else {
            	fail('unusual HTTP status received');
            }
        })

    }, aux.specTime);

    it("on login page", function(done) {

        request(site.loginUrl, function(error, response, body) {
            if(response.statusCode == 404) {
                fail('404 on login page');
                done();
            }
            else if(response.statusCode == 500) {
                fail('whitescreen on login page');
                done();
            }
            else if(response.statusCode == 200) {
            	var flag = body.split(" ")[0];
            	if(flag == 'exception' || flag == 'Exception' ||
            		flag == 'warning' || flag == 'Warning') {
	                fail('exception thrown on login page');
	                done();	
            	}
	            else {
	                done();
	            }
            }
            else {
            	fail('unusual HTTP status received');
            }
        })

    }, aux.specTime);

    it("on category page", function(done) {

        request(site.categoryUrl, function(error, response, body) {
            if(response.statusCode == 404) {
                fail('404 on category page');
                done();
            }
            else if(response.statusCode == 500) {
                fail('whitescreen on category page');
                done();
            }
            else if(response.statusCode == 200) {
            	var flag = body.split(" ")[0];
            	if(flag == 'exception' || flag == 'Exception' ||
            		flag == 'warning' || flag == 'Warning') {
	                fail('exception thrown on category page');
	                done();	
            	}
	            else {
	                done();
	            }
            }
            else {
            	fail('unusual HTTP status received');
            }
        })

    }, aux.specTime); 
    
    it("on product page", function(done) {

        request(site.productUrl, function(error, response, body) {
            if(response.statusCode == 404) {
                fail('404 on product page');
                done();
            }
            else if(response.statusCode == 500) {
                fail('whitescreen on product page');
                done();
            }
            else if(response.statusCode == 200) {
            	var flag = body.split(" ")[0];
            	if(flag == 'exception' || flag == 'Exception' ||
            		flag == 'warning' || flag == 'Warning') {
	                fail('exception thrown on product page');
	                done();	
            	}
	            else {
	                done();
	            }
            }
            else {
            	fail('unusual HTTP status received');
            }
        })

    }, aux.specTime);    


});