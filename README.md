# octo-umbrella

This project is a work-in-progress implementation of a test harness for the RDS client site. Running on node, it executes a number of functional regression tests, reports on the test results, and integrates into the site deployment workflow.

The harness runs on OS X and Linux environments, as well as in Docker containers, therefore it can run on local dev environments as well as in dockerized test environments.

The two main modules leveraged by the harness are [Jasmine](http://jasmine.github.io/) and [Nightmare] (https://github.com/segmentio/nightmare). Jasmine to organize and run the tests, and Nightmare to drive the browser interaction necessary to retrieve information that can be subject to tests. Nightmare itself is a browser automation library, running on top of a headless version of [Electron](https://github.com/electron/electron), a web framework developed by GitHub.

### Test Design

Tests can be of varying complexity; the harness is designed to allow simple tests to run first and have the more complex tests run only if the previous ones pass. This design makes it so longer/larger tests are not executed if a more fundamental problem is found. The following is an example of a simple test:

```javascript
var site = require('../../../setup/config/website.js');
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
The test uses the `request` module to make an HTTP request to the homepage and check the response. *website.js* is a helper file that includes site specific information like the homepage URL. *aux.js* is a helper file that includes test specific information like the test time out value `specTime`. In more complex tests *aux.js* could include artifacts such as selectors and URLs of pages specifc to the test. The following is an example of a more complex test:

```javascript
var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../setup/config/website.js');
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

The `xvfb` module allows us to start and stop a [virtual display framebuffer](https://www.npmjs.com/package/xvfb), needed for Nightmare to execute on Docker/Linux environments. The `browser` object is a Nightmare instance that navigates to the admin login page, places a session cookie, loads the feature configuration page, and retrieves the value of the configuraiton field; the test then checks the configuration field is populated.

Most of the time a test suite (`describe`) will contain more than one test (`it`). The tests within a test suite can be daisy-chained, with each test picking up the state of the site as the previous test left it. Since tests are always executed sequentially within their suites, it is possible to translate complex user interactions into a series of small tests.

##### Available Tests

Every (`it`) function is considered a test. Tests are grouped in test suites, and so far there is one test suite per file. Test sets are groups of one or more test suites, and levels are groups of one or more test sets. The test sets currently available are:

* level1
  * access
* level2
  * admin
  * cart
  * crawler
  * style
  * user
* level3
  * associateOrders
  * brandManager
  * globalFooter
  * globalHeader
  * homepage
  * megaMenu
  * productBadges
  * shortUrl

Level 1 tests are rudimentary http request tests to make sure the major pages of the site are accessible. Level 2 tests are slightly more complex tests, like checking adding an item to cart, or checking if the user can log in through the storefront. Level 3 tests are feature tests, these tests check specific use cases to assure the functionality of major features of the site. 

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

### Test Execution

To run the tests on your machine, against the QA1 environment: 

- Clone or fork this repository
- From the `src/` directory call `npm install`
- To run tests, call `npm start [command]`

The single optional argument `command` is either the name of a level (like `'level2'`) or the name of a test set (like `'homepage'`). When calling `npm start [command]` the tests will execute in dependency mode, that is, the more complex tests will not execute until the previous tests have passed. If `npm start homepage` is called, then all level 1 and level 2 tests will run before the homepage set is run. By default, calling `npm start` with no argument will run all tests in the first level.

To bypass dependency mode call `npm test [command]`, this will run the level or set indicated by `command` without executing any previous simpler tests.

