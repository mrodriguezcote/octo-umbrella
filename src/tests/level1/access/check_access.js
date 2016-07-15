var site = require('../../../setup/config/website.js');
var request = require('request');
var specTime = 6000;

/* Perform an HTTP request from each of the main pages and ensure no
whitescreens of 404s from any */
describe("Loading", function() {

    it("homepage", function(done) {

        request(site.homeUrl, {timeout: specTime}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split('\n')[0];
                if(response.statusCode == 404) {
                    fail('404 on homepage');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on homepage: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    done();
                    // if(flag == site.expectedBody) {
                    //     done();
                    // }
                    // else {
                    //     fail('exception on homepage: '+flag);
                    //     done();
                    // }
                }
                else {
                    fail(response.statusCode+' HTTP status received');
                    done();
                }
            }
        }).auth(site.htuser, site.htpass)

    },specTime);

    it("login page", function(done) {

        request(site.loginUrl, {timeout: specTime}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split('\n')[0];
                if(response.statusCode == 404) {
                    fail('404 on login page');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on login page: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    done();
                    // if(flag == site.expectedBody) {
                    //     done();
                    // }
                    // else {
                    //     fail('exception on login page: '+flag);
                    //     done();
                    // }
                }
                else {
                    fail(response.statusCode+' HTTP status received');
                    done();
                }
            }
        }).auth(site.htuser, site.htpass)

    },specTime);

    it("category page", function(done) {

        request(site.categoryUrl, {timeout: specTime}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split('\n')[0];
                if(response.statusCode == 404) {
                    fail('404 on category page');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on category page: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    done();
                    // if(flag == site.expectedBody) {
                    //     done();
                    // }
                    // else {
                    //     fail('exception on login page: '+flag);
                    //     done();
                    // }
                }
                else {
                    fail(response.statusCode+' HTTP status received');
                    done();
                }
            }
        }).auth(site.htuser, site.htpass)

    },specTime); 
    
    it("product page", function(done) {

        request(site.productUrl, {timeout: specTime}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split('\n')[0];
                if(response.statusCode == 404) {
                    fail('404 on product page');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on product page: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    done();
                    // if(flag == site.expectedBody) {
                    //     done();
                    // }
                    // else {
                    //     fail('exception on login page: '+flag);
                    //     done();
                    // }
                }
                else {
                    fail(response.statusCode+' HTTP status received');
                    done();
                }
            }
        }).auth(site.htuser, site.htpass)

    },specTime);

    // Hit the empty cart page and ensure it loads correctly //
    it("cart page", function(done) {

        request(site.cartUrl, {timeout: specTime}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag = body.split('\n')[0];
                if(response.statusCode == 404) {
                    fail('404 on cart page');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on cart page: '+flag);
                    done();
                }
                else if(response.statusCode == 200) {
                    done();
                    // if(flag == site.expectedBody) {
                    //     done();
                    // }
                    // else {
                    //     fail('exception on login page: '+flag);
                    //     done();
                    // }
                }
                else {
                    fail(response.statusCode+' HTTP status received');
                    done();
                }                
            }
        }).auth(site.htuser, site.htpass)

    },specTime);

});