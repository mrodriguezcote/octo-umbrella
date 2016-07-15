//Bypass Runner. The second argument [set] is optional
module.exports.run = function(level, set) {
	var levelToRun = level;
	var setToRun = !set ? '' : set;
	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	var reporter = require('../utilities/reporting/junit_reporter.js');
	var junitReporter = new reporter.JUnitXmlReporter({
		savePath: './utilities/reporting/',
		consolidateAll: true,
		stylesheet: 'junitresults.xsl'
	});
	jasmine.loadConfig({
		spec_dir: './tests/'+levelToRun+'/'+setToRun,
		spec_files: ['**/*.js'],
	});
	jasmine.configureDefaultReporter({ showColors: true });
	jasmine.addReporter(junitReporter);
	jasmine.onComplete(function(passed) {
		if(passed) {console.log('All tests passed');}
		else {console.log('At least one test failed');}
	});
	jasmine.execute();
}


