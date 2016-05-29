var site = require('../../../setup/config/website.js');
var aux = require('./aux.js');
var request = require('request');

/* Perform an HTTP request from staging homepage/admin and ensure no
whitescreens of 404s from any */
describe("Loading", function() {
   
    it("staging homepage", function(done) {

        request(site.stageHomeUrl, {timeout: aux.timeout}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag1 = body.split(" ")[0];
                var flag2 = body.split('\n')[0];
                if(response.statusCode == 404) {
                    fail('404 on homepage');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on homepage: '+flag2);
                    done();
                }
                else if(response.statusCode == 200) {
                    if(flag1 == 'exception' || flag1 == 'Exception' ||
                        flag1 == 'warning' || flag1 == 'Warning') {
                        fail('exception on homepage: '+flag2);
                        done(); 
                    }
                    else {
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

    it("staging admin", function(done) {

        request(site.stageAdminUrl, {timeout: aux.timeout}, function(error, response, body) {
            if(error) {
                fail('server error');
                done();
            }
            else {
                var flag1 = body.split(" ")[0];
                var flag2 = body.split('\n')[0];
                if(response.statusCode == 404) {
                    fail('404 on admin');
                    done();
                }
                else if(response.statusCode == 500) {
                    fail('whitescreen on admin: '+flag2);
                    done();
                }
                else if(response.statusCode == 200) {
                    if(flag1 == 'exception' || flag1 == 'Exception' ||
                        flag1 == 'warning' || flag1 == 'Warning') {
                        fail('exception on admin: '+flag2);
                        done(); 
                    }
                    else {
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