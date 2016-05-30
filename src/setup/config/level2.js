//Level 2 Runner
module.exports.run = function(flag) {
	var setToRun = !flag ? '' : flag;
	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	var reporters = require('jasmine-reporters');
	var junitReporter = new reporters.JUnitXmlReporter({
		savePath: './teardown/reporter/',
		consolidateAll: true
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
			var reporters = require('jasmine-reporters');
			var junitReporter2 = new reporters.JUnitXmlReporter({
				savePath: './teardown/reporter/',
				consolidateAll: true
			});
			jasmine.loadConfig({
				spec_dir: './tests/level2/'+setToRun,
				spec_files: ['**/*.js']
			});
			jasmine.configureDefaultReporter({ showColors: true });
			jasmine.addReporter(junitReporter2);

			jasmine.onComplete(function(passed) {
				if(passed) {console.log('All Level 2 tests passed');}
				else {console.log('At least one Level 2 test failed');}
			});
			jasmine.execute();
		}
		else {console.log('At least one Level 1 test failed');}
	});
	jasmine.execute();
}
