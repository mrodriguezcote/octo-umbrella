//Level 1 Runner
module.exports.runLevel = function(flag) {
	var setToRun = !flag ? '' : flag;
	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	var reporters = require('jasmine-reporters');
	var junitReporter = new reporters.JUnitXmlReporter({
		savePath: './teardown/reporter/',
		consolidateAll: true
	});
	jasmine.loadConfig({
		spec_dir: './tests/level1/'+setToRun,
		spec_files: ['**/*.js'],
	});
	jasmine.configureDefaultReporter({ showColors: true });
	jasmine.addReporter(junitReporter);
	jasmine.onComplete(function(passed) {
		if(passed) {console.log('All specs passed');}
		else {console.log('At least one spec failed');}
	});
	jasmine.execute();
}


