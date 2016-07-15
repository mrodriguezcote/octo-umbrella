//Level 3 Runner
module.exports.run = function(flag) {
	var setToRun = !flag ? '' : flag;
	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	var reporter = require('../utilities/reporting/junit_reporter.js');
	var junitReporter = new reporter.JUnitXmlReporter({
		savePath: './utilities/reporting/',
		consolidateAll: true,
		stylesheet: 'junitresults.xsl'
	});
	jasmine.loadConfig({
		spec_dir: 'tests/level1/',
		spec_files: ['**/*.js']
	});
	jasmine.configureDefaultReporter({ showColors: true });
	jasmine.addReporter(junitReporter);
	jasmine.onComplete(function(passed) {
		if(passed) {
			var Jasmine = require('jasmine'), jasmine = new Jasmine;
			var reporter = require('../utilities/reporting/junit_reporter.js');
			var junitReporter2 = new reporter.JUnitXmlReporter({
				savePath: './utilities/reporting/',
				consolidateAll: true,
				stylesheet: 'junitresults.xsl'
			});
			jasmine.loadConfig({
				spec_dir: 'tests/level2/',
				spec_files: ['**/*.js']
			});
			jasmine.configureDefaultReporter({ showColors: true });
			jasmine.addReporter(junitReporter2);

			jasmine.onComplete(function(passed) {
				if(passed) {
					var Jasmine = require('jasmine'), jasmine = new Jasmine;
					var reporter = require('../utilities/reporting/junit_reporter.js');
					var junitReporter3 = new reporter.JUnitXmlReporter({
						savePath: './utilities/reporting/',
						consolidateAll: true,
						stylesheet: 'junitresults.xsl'
					});
					jasmine.loadConfig({
						spec_dir: './tests/level3/'+setToRun,
						spec_files: ['**/*.js']
					});
					jasmine.configureDefaultReporter({ showColors: true });
					jasmine.addReporter(junitReporter3);

					jasmine.onComplete(function(passed) {
						if(passed) {console.log('All Level 3 tests passed');}
						else {console.log('At least one Level 3 test failed');}
					});
					jasmine.execute();
				}
				else {console.log('At least one Level 2 test failed');}
			});
			jasmine.execute();
		}
		else {console.log('At least one Level 1 test failed');}
	});
	jasmine.execute();
}