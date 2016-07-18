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
var request = require('request');

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
                }
                else {
                    fail(response.statusCode+' HTTP status received');
                    done();
                }
            }
        }).auth(site.htuser, site.htpass)
    },specTime);
});
```
The test uses the `request` module to make an HTTP request to the homepage and check the response. *website.js* is a helper file that includes site specific information like the homepage URL. *website.js* reads this information from a sngle configuration file, which can be overriden by specific client configurations. This allows a single code base of tests to be executed against multiple clients, and multiple environments via [text configuration files](#test-design). The following is an example of a more complex test:

```javascript
var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var site = require('../../../setup/config/website.js');

describe("Category", function() {

    beforeAll(function() { 
        xvfb.start(); 
        browser = nightmare(site.electronOptions);
        browser.authentication(site.htuser, site.htpass);
    });
    
    afterAll(function() { 
        browser.end().then();
        xvfb.stop(); 
    });

    /* Ensure category contains correct number of items */
    it("correct number of items in category", function(done) {
        browser
            .goto(site.categoryUrl)
            .evaluate(function(itemsActualSelector) {
                return parseInt(jQuery(itemsActualSelector)[0].innerText);
            },site.itemsActualSelector)
            .then(function (count) {
                expect(count).toBe(site.itemsExpected);
                done();
            })          
    },specTime);
});
```

The `xvfb` module allows us to start and stop a [virtual display framebuffer](https://www.npmjs.com/package/xvfb), needed for Nightmare (and any other WebDriver based tools) to execute on Docker/Linux servers. The `browser` object is a Nightmare instance that navigates to the category page and checks the number of items availabe in the store front.

Most of the time a test suite (`describe`) will contain more than one test (`it`). The tests within a test suite can be daisy-chained, with each test picking up the state of the site as the previous test left it. Since tests are always executed sequentially within their suites, it is possible to translate complex user interactions into a series of small tests.

##### Available Tests

Every (`it`) function is considered a test. Tests are grouped in test suites. Sets are groups of one or more suites, and levels are groups of one or more sets. The base tests currently implemented are:

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
  * config/ *configuration files*
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

To run the tests : 

1. Clone or fork this repository
2. From the `src/` directory call `npm install`
3. Update your client configuration files
4. Call `NODE_ENV=[client] npm start [command]`

The optional argument `command` can be either the name of a level (like `level2`) or the name of a test set (like `filtration`). When calling `npm start [command]` the tests will execute in dependency mode, that is, the more complex tests will not execute until the previous tests have passed. If `npm start performance` is called, then all level 1 and level 2 tests will run before the performance tests run. 

when developing/debugging new tests call `npm start [command] bypass` to bypass dependency mode. This will run the level or set indicated by `command` without executing any previous simpler tests. By default, calling `npm start` or `npm start bypass` with no `command` argument will run all available base tests.

##### Client Configuration

The required argument `client` is the client code for the client whose configuration file will override the default configuration file. Each client can have its own configuration file, this file can contain client specific information like URLs, selectors, catalog values, etc. By following a common syntax acrosss configuration files, only the configuration values defined in the client files will override the default configuration file. This way, configuration information shared by multiple clients can be defined in a single place. The `config/` space is reserved for the default configuration file and any other client configuration files.


##### Optional Setup and Teardown

The `utilities/scripts/` space holds scripts that can be executed before and after the actual call to the test runner occurs and completes. These spaces could hold scripts that prepare the Magento application for testing by inserting testable data and removing it after the tests have executed. This way, tests that rely on specific product/cateogory setup, CMS content configuration, or user accounts information can run effectively and consistently every time, and the data of the application under test is not affected by test execution.

##### Reporting

The results of each test run are both output to the command line and written to file as XML. The `teardown/reporter/` space houses the XML file as well as an XSL stylesheet. This allows us to see the results of the last test run by reaching the XML file through a browser at *http://localhost/path-to-reporter/junitresults.xml* . The resulting page will show all test suites executed, the time it took to execute them, and which (if any) failed.
