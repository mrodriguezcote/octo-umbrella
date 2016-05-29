//Level 2 Runner
module.exports.runLevel = function(flag) {
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
				if(passed) {console.log('All specs passed');}
				else {console.log('At least one spec failed');}
			});
			jasmine.execute();
		}
		else {console.log('At least one spec failed');}
	});
	jasmine.execute();
}
