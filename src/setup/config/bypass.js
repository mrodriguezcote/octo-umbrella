//Bypass Runner. The second argument [setToRun] is optional
module.exports.run = function(level, set) {
	var levelToRun = level;
	var setToRun = !set ? '' : set;
	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	var reporters = require('jasmine-reporters');
	var junitReporter = new reporters.JUnitXmlReporter({
		savePath: './teardown/reporter/',
		consolidateAll: true
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


