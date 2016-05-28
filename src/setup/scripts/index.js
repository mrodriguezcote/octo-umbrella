var _ = require('lodash');
var fs = require('fs');

/* Execute each of the scripts under the src/setup/scripts directory
These scripts prepare the application for tests to run*/
var executeSetupScripts = function() {
	var dir = process.cwd()+'/setup/scripts/';
	fileList = fs.readdirSync(dir);
	_.filter(fileList, function(file) {
		return file.name !== 'index.js';
	})
	_.each(fileList, function(file) {
		require(dir+file);
	});
}

executeSetupScripts();