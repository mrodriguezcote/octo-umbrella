# Cross-Client Test Harness

This project is a work-in-progress implementation of a test harness that can execute against any number of client sites. Running on node, it executes a number of functional regression tests, reports on the test results, and integrates into the site deployment workflow.

The harness runs on OS X and Linux environments, as well as in Docker containers, therefore it can run on local dev environments as well as in dockerized test environments.

The two main modules leveraged here are [Jasmine](http://jasmine.github.io/) and [Nightmare] (https://github.com/segmentio/nightmare). Jasmine to organize and run the tests, and Nightmare to drive the browser interaction necessary to retrieve information that can be subject to tests. Nightmare itself is a browser automation library, running on top of a headless version of [Electron](https://github.com/electron/electron), a web framework developed by GitHub.

* [Test Design](#test-design)
  * [Available Tests](#available-tests)
  * [Framework Layout](#framework-layout)
* [Test Execution](#test-execution)
  * [Setup and Teardown](#setup-and-teardown)
  * [Reporting](#reporting)
  * [Diagnosis](#diagnosis)

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
                done();
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

The `xvfb` module allows us to start and stop a [virtual display framebuffer](https://www.npmjs.com/package/xvfb), needed for Nightmare to execute on Docker/Linux environments. The `browser` object is a Nightmare instance that navigates to the admin login page, places a session cookie, loads the feature configuration page, and retrieves the value of the configuraiton field. The test then checks the configuration field is populated.

Most of the time a test suite (`describe`) will contain more than one test (`it`). The tests within a test suite can be daisy-chained, with each test picking up the state of the site as the previous test left it. Since tests are always executed sequentially within their suites, it is possible to translate complex user interactions into a series of small tests.

##### Available Tests

Every (`it`) function is considered a test. Tests are grouped in test suites, and so far there is one test suite per file. Sets are groups of one or more suites, and levels are groups of one or more sets. The test sets currently available are:

* level1
  * access
* level2
  * filtration
* level3
  * performance
* level4
  * cart
  * crawler
  * user

Level 1 tests are rudimentary http request tests to make sure the major pages of the site are accessible. Level 2 tests are slightly more complex tests, like checking a category page to make sure enough products display. Level 3 tests are performance tests. Level 4 tests are even more involved tests, like adding an item to cart and checking a user can log in through the storefront 

##### Framework Layout

* src/
  * config/ *client configuration overrides*
  * tests/
     * level1/ *simpler tests*
     * level2/ ..
     * level3/ ..
     * level4/ *more complex tests*
  * utilities/
     * reporting/ *results and reporting* 
     * scripts/ *scripts executed around the test runner*
  * package.json
  * runner.js *test runner executable, execution logic*

### Test Execution

To run the tests locally (against the QA1 environment): 

1. Clone or fork this repository
2. From the `src/` directory call `npm install`
3. To run tests, call `npm start [command]`

The single optional argument `command` is either the name of a level (like `level2`) or the name of a test set (like `homepage`). When calling `npm start [command]` the tests will execute in dependency mode, that is, the more complex tests will not execute until the previous tests have passed. If `npm start homepage` is called, then all level 1 and level 2 tests will run before the homepage set is run. 

To bypass dependency mode call `npm start [command] bypass`, this will run the level or set indicated by `command` without executing any previous simpler tests. By default, calling `npm start` or `npm start bypass` with no `command` argument will run all tests in the first level.

##### Setup and Teardown

The `utilities/scripts/` space holds scripts that can be executed before and after the actual call to the test runner occurs and completes. In the future, these spaces will hold scripts that prepare the Magento application for testing by injecting testable data into the database and removing it after the tests have executed. This way, tests that rely on specific product/cateogory setup, CMS content configuration, or user accounts information can run effectively and consistently every time, and the database of the application under test is not affected by test execution.

##### Reporting

The results of each test run are both output to the command line and written to file as XML. The `teardown/reporter/` space houses the XML file as well as an XSL stylesheet. This allows us to see the results of the last test run by reaching the XML file through a browser at *http://localhost/path-to-reporter/junitresults.xml* . The resulting page will show all test suites executed, the time it took to execute them, and which (if any) failed.

##### Diagnosis

There are two mechanisms that can detect a failure in a test - the Jasmine expectation, and the time out value of the Jasmine test. Take the following as example:

```javascript
var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../setup/config/website.js');
var aux = require('./aux.js');

describe("Adding product to cart", function() {
    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions); 
    });
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });
    it("page loads", function(done) {
        browser
            .goto(site.productUrl)
            .click(site.addToCart)
            .wait(site.addToCartConfirm)
            .goto(site.cartUrl)
            .title()
            .then(function (title) {
                expect(title).toBe('Shopping Cart');
                done();
            })          
    }, aux.specTime);
});
```

The test could fail if `expect(title).toBe('Shopping Cart')` resolves negative, which would mean that when the cart page was requested, the correct title of the page was not found, indicating the page was loaded incorrectly or not at all. The test could also fail if `.goto(site.cartUrl)` takes longer than the timeout value `aux.specTime`, which would mean the cart page took too long to load. In the first scenario, the failure is reported as:

-- *Expected 'wrongtitle' to be 'Shopping Cart'* --

In the second scenairio the failure is reported as:

-- *Error: Timeout - Async callback was not invoked within timeout specified by jasmine* --
