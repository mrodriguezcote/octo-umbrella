var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var async = require('async');
var site = require('../../../setup/config/website.js');
var aux = require('./aux.js');

var expectedStyles;

describe("Style guide", function() {
   
    beforeAll(function() { 
        xvfb.start(); 
    });

    beforeEach(function() { 
        browser = nightmare(site.electronOptions); 
    });
    
    afterAll(function() { 
        xvfb.stop(); 
    });

    /* Hit style guide page and retrieve attributes from the link element */
    it("link styles retrieved from style guide", function(done) {
        
        browser
            .goto(site.styleGuide)
            .evaluate(function() {
                atts = [];
                element = jQuery('.sg-links')[0].children[0];
                atts.push(jQuery(element).css('font-family'));
                atts.push(jQuery(element).css('font-size'));
                atts.push(jQuery(element).css('font-weight'));
                atts.push(jQuery(element).css('font-style'));
                atts.push(jQuery(element).css('color'));
                return atts;
            })
            .end()
            .then(function (linkStyles) {
                expect(linkStyles).toBeDefined();
                expectedStyles = linkStyles;
                done();
            })

    }, aux.specTime);

    /* In the first async series function we retireve each attribute from each a tag
    on the homepage. In the second async series function we compare each attribute from
    the style guide element to each attribute of each a tag and make sure that at least
    50% of the links on the homepage are style guide compliant */
    it("links from page follow style guide", function(done) {

        async.series([
            function(callback) {
                browser
                    .goto(site.homeUrl)
                    .evaluate(function() {
                        allLinks = [];
                        jQuery('a').each(function() {
                            atts = [];
                            atts.push(jQuery(this).css('font-family'));
                            atts.push(jQuery(this).css('font-size'));
                            atts.push(jQuery(this).css('font-weight'));
                            atts.push(jQuery(this).css('font-style'));
                            atts.push(jQuery(this).css('color'));
                            atts.push(jQuery(this).text().trim());
                            allLinks.push(atts);
                        })
                        return allLinks;
                    })
                    .end()
                    .then(function (linksOnPage) {
                        expect(linksOnPage).toBeDefined();
                        callback(null, linksOnPage);
                    })
            }],
            function(err, results) {
                linksOnPage = results[0];
                goodLinks = [];
                badLinks = [];
                for(i in linksOnPage) {
                    actualStyles = linksOnPage[i];
                    if( actualStyles[0] == expectedStyles[0] &&
                        actualStyles[1] == expectedStyles[1] &&
                        actualStyles[2] == expectedStyles[2] &&
                        actualStyles[3] == expectedStyles[3] &&
                        actualStyles[4] == expectedStyles[4] ) {
                        goodLinks.push(actualStyles[5]);
                    }
                    else { 
                        badLinks.push(actualStyles[5]);
                    }
                }
                percentBad = Number((badLinks.length/linksOnPage.length)*100).toFixed(0);
                expect(percentBad).toBeLessThan(50);
                //console.log(percentBad+'% of the links do not follow style guide');
                done();
            })

    }, aux.specTime);


});