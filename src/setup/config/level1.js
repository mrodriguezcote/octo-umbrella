//Level 1 Runner
module.exports.run = function(flag) {
	var setToRun = !flag ? '' : flag;
	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	var reporter = require('../../teardown/reporter/junit_reporter.js');
	var junitReporter = new reporter.JUnitXmlReporter({
		savePath: './teardown/reporter/',
		consolidateAll: true,
		stylesheet: 'junitresults.xsl'
	});
	jasmine.loadConfig({
		spec_dir: './tests/level1/'+setToRun,
		spec_files: ['**/*.js'],
	});
	jasmine.configureDefaultReporter({ showColors: true });
	jasmine.addReporter(junitReporter);
	jasmine.onComplete(function(passed) {
		if(passed) {console.log('All Level 1 tests passed');}
		else {console.log('At least one Level 1 test failed');}
	});
	jasmine.execute();
}


