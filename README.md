# octo-umbrella

This project is a work-in-progress implementation of a test harness for the RDS client site. Running on node, it executes a number of functional regression tests, reports on the test results, and integrates into the site deployment workflow.

The harness runs on OS X and Linux environments, as well as in Docker containers, therefore it can run on local dev environments as well as in dockerized test environments.

The two main modules leveraged by the harness are [Jasmine](http://jasmine.github.io/) and [Nightmare] (https://github.com/segmentio/nightmare). Jasmine to organize and run the tests, and Nightmare to drive the browser interaction necessary to retrieve information that can be subject to tests. Nightmare itself is a browser automation library, running on top of a headless version of [Electron](https://github.com/electron/electron), a web framework developed by GitHub.

### Test Design

Tests can be of varying complexity, when running on a continuous integration server the most simple tests run first and the more complex tests run only if the previous ones pass. The following is an example of a simple test:

```javascript
var site = require('../../website.js');
var aux = require('./aux.js');
var request = require('request');

describe("Loading", function() {
    it("homepage", function(done) {
        request(site.homeUrl, function(error, response, body) {
            var flag = body.split(" ")[0];
            if(response.statusCode == 404) {
                fail('404 on homepage');
                done();
            }
            else if(response.statusCode == 500) {
                fail('whitescreen on homepage: ');
                done();
            }
            else if(response.statusCode == 200) {
                if(flag == 'exception' || flag == 'Exception' ||
                    flag == 'warning' || flag == 'Warning') {
                    fail('exception on homepage: ');
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
```
The test uses the `request` module to make an HTTP request to the homepage and check the response. *website.js* is a helper file that includes site specific information like the homepage URL. *aux.js* is a helper file that includes test specific information like the test time out value `specTime`. In more complex tests *aux.js* could include atrifacts such as selectors and URLs of pages specifc to the test. The following is an example of a more complex test:

```javascript
var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../website.js');
var aux = require('./aux.js');

describe("Associate Orders", function() {
    beforeAll(function() { 
        xvfb.start();
        browser = nightmare(site.electronOptions); 
    });
    afterAll(function() {
        browser.end().then(); 
        xvfb.stop(); 
    });
    it("configuration is in place", function(done) {
        browser
            .goto(site.adminUrl)
            .cookies.set(site.adminCookie.name, site.adminCookie.value)
            .goto(aux.adminConfig)
            .evaluate(function(configField) {
                return jQuery(configField).val();
            },aux.configField)
            .then(function (config) {
                expect(config).toBeDefined();
                done();
            })
    }, aux.specTime);
});
```

The `xvfb` module allows us to start and stop a virtual display [framebuffer](https://www.npmjs.com/package/xvfb), needed for Nightmare to execute on Docker/Linux environments. The `browser` object is a Nightmare instance that navigates to the admin login page, places a session cookie, loads the feature configuration page, and retrieves the value of the configuraiton field; the test then checks the configuration field is populated.

Most of the time a test suite (`describe`) will contain more than one test (`it`). The tests within a test suite can be daisy-chained, with each test picking up the state of the site as the previous test left it. Since tests are always executed sequentially within their suites, it is possible to translate complex user interactions into a series of small tests.

##### Project Structure

* src
  * node_modules (modules needed to run the harness)
  * setup
     * config - configuration files
     * scripts - scripts to execute before test runner is engaged
  * teardown
     * reporter - results and reporting 
     * scripts - scripts to execute after test runner is engaged
  * tests
     * level1 - Simpler tests
     * level2 - ..
     * level3 - More complex tests
  * package.json (module dependency management)
  * runner.js (test runner executable, execution logic)
