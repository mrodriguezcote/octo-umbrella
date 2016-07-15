var loadtest = require('loadtest');
var site = require('../../../setup/config/website.js');
var specTime = 20000;

var options = {
    url: site.searchUrl+'test',
    concurrency: 10,
    maxRequests: 100,
    maxSeconds: specTime,
};

describe("Performing site search", function() {


    it("maintains performance", function(done) {

        loadtest.loadTest(options, function(error, result) {
            if (error) {
                return console.error('Got an error: %s', error);
            }
            expect(result.totalErrors).toBe(0);
            expect(result.meanLatencyMs).toBeLessThan(1600);
            done();
        });         

    },specTime);


});