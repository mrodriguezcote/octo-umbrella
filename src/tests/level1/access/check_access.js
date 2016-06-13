var site = require('../../../setup/config/website.js');
var aux = require('./aux.js');
var request = require('request');

/* Perform an HTTP request from each of the main pages and ensure no
whitescreens of 404s from any */
describe("Loading", function() {
   
    it("homepage", function(done) {

        request(site.homeUrl, {timeout: aux.timeout}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split(' ')[0][1];
                if(response.statusCode == 404) {
                    fail('404 on homepage');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on homepage: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    if(flag == '<' || flag == '!') {
                        done();
                    }
                    else {
                        fail('exception on homepage: '+flag);
                        done();
                    }
                }
                else {
                    fail('unusual HTTP status received');
                    done();
                }
            }
        })

    }, aux.specTime);

    it("admin", function(done) {

        request(site.adminUrl, {timeout: aux.timeout}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split(' ')[0][1];
                if(response.statusCode == 404) {
                    fail('404 on admin');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on admin: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    if(flag == '<' || flag == '!') {
                        done();
                    }
                    else {
                        fail('exception on admin: '+flag);
                        done();
                    }
                }
                else {
                    fail('unusual HTTP status received');
                    done();
                }
            }
        })

    }, aux.specTime);

    it("login page", function(done) {

        request(site.loginUrl, {timeout: aux.timeout}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split(' ')[0][1];
                if(response.statusCode == 404) {
                    fail('404 on login page');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on login page: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    if(flag == '<' || flag == '!') {
                        done();
                    }
                    else {
                        fail('exception on login page: '+flag);
                        done();
                    }
                }
                else {
                    fail('unusual HTTP status received');
                    done();
                }
            }
        })

    }, aux.specTime);

    it("category page", function(done) {

        request(site.categoryUrl, {timeout: aux.timeout}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split(' ')[0][1];
                if(response.statusCode == 404) {
                    fail('404 on category page');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on category page: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    if(flag == '<' || flag == '!') {
                        done();
                    }
                    else {
                        fail('exception on category page: '+flag);
                        done();
                    }
                }
                else {
                    fail('unusual HTTP status received');
                    done();
                }
            }
        })

    }, aux.specTime); 
    
    it("product page", function(done) {

        request(site.productUrl, {timeout: aux.timeout}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split(' ')[0][1];
                if(response.statusCode == 404) {
                    fail('404 on product page');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on product page: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    if(flag == '<' || flag == '!') {
                        done();
                    }
                    else {
                        fail('exception on product page: '+flag);
                        done();
                    }
                }
                else {
                    fail('unusual HTTP status received');
                    done();
                }
            }
        })

    }, aux.specTime);

    /* Hit the empty cart page and ensure it loads correctly */
    it("cart page", function(done) {

        request(site.cartUrl, {timeout: aux.timeout}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split(' ')[0][1];
                if(response.statusCode == 404) {
                    fail('404 on cart page');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on cart page: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    if(flag == '<' || flag == '!') {
                        done();
                    }
                    else {
                        fail('exception on cart page: '+flag);
                        done();
                    }
                }
                else {
                    fail('unusual HTTP status received');
                    done();
                }                
            }

        })

    }, aux.specTime);    


});