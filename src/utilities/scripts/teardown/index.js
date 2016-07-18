var _ = require('lodash');
var fs = require('fs');

/* Execute each of the scripts under the src/utilities/scripts/setup/ 
directory. */
var executeSetupScripts = function() {
	var dir = process.cwd()+'/utilities/scripts/teardown/';
	fileList = fs.readdirSync(dir);
	_.filter(fileList, function(file) {
		return file.name !== 'index.js';
	})
	_.each(fileList, function(file) {
		require(dir+file);
	});
}

executeSetupScripts();