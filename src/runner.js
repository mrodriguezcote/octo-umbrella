if(!process.argv[2]) {
	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	var reporters = require('jasmine-reporters');
	var junitReporter = new reporters.JUnitXmlReporter({
	    savePath: './testData',
	    consolidateAll: true
	});
	jasmine.loadConfigFile('testOrg/simple/jasmine.json');
	jasmine.configureDefaultReporter({ showColors: true });
	jasmine.addReporter(junitReporter);

	jasmine.onComplete(function(passed) {
	    if(passed) {console.log('All specs passed');}
		else {console.log('At least one spec failed');}
	});
	jasmine.execute();
}

else if(process.argv[2] == '1') {
	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	var reporters = require('jasmine-reporters');
	var junitReporter = new reporters.JUnitXmlReporter({
	    savePath: './testData',
	    consolidateAll: true
	});
	jasmine.loadConfigFile('./testOrg/tier1/jasmine.json');
	jasmine.configureDefaultReporter({ showColors: true });
	jasmine.addReporter(junitReporter);
	jasmine.onComplete(function(passed) {
	    if(passed) {console.log('All specs passed');}
	    else {console.log('At least one spec failed');}
	});
	jasmine.execute();
}

else if(process.argv[2] == '2') {

	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	var reporters = require('jasmine-reporters');
	var junitReporter = new reporters.JUnitXmlReporter({
	    savePath: './testData',
	    consolidateAll: true
	});
	jasmine.loadConfigFile('./testOrg/tier1/jasmine.json');
	jasmine.configureDefaultReporter({ showColors: true });
	jasmine.addReporter(junitReporter);
	jasmine.onComplete(function(passed) {
	    if(passed) {
	    	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	    	var reporters = require('jasmine-reporters');
			var junitReporter2 = new reporters.JUnitXmlReporter({
			    savePath: './testData',
			    consolidateAll: true
			});
	    	jasmine.loadConfigFile('./testOrg/tier2/jasmine.json');
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

else if(process.argv[2] == '3') {

	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	var reporters = require('jasmine-reporters');
	var junitReporter = new reporters.JUnitXmlReporter({
	    savePath: './testData',
	    consolidateAll: true
	});
	jasmine.loadConfigFile('./testOrg/tier1/jasmine.json');
	jasmine.configureDefaultReporter({ showColors: true });
	jasmine.addReporter(junitReporter);
	jasmine.onComplete(function(passed) {
	    if(passed) {
	    	var Jasmine = require('jasmine'), jasmine = new Jasmine;
	    	var reporters = require('jasmine-reporters');
			var junitReporter2 = new reporters.JUnitXmlReporter({
			    savePath: './testData',
			    consolidateAll: true
			});
	    	jasmine.loadConfigFile('testOrg/tier2/jasmine.json');
	    	jasmine.configureDefaultReporter({ showColors: true });
	    	jasmine.addReporter(junitReporter2);
			jasmine.onComplete(function(passed) {
			    if(passed) {
			    	var Jasmine = require('jasmine'), jasmine = new Jasmine;
			    	var reporters = require('jasmine-reporters');
					var junitReporter3 = new reporters.JUnitXmlReporter({
					    savePath: './testData',
					    consolidateAll: true
					});
			    	jasmine.loadConfigFile('./testOrg/tier3/jasmine.json');
			    	jasmine.configureDefaultReporter({ showColors: true });
			    	jasmine.addReporter(junitReporter3);
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
	    else {console.log('At least one spec failed');}
	});
	jasmine.execute();
}
