var _ = require('lodash');
var fs = require('fs');

var executeSetupScripts = function() {
	var dir = process.cwd()+'/teardown/scripts/';
	fileList = fs.readdirSync(dir);
	_.filter(fileList, function(file) {
		return file.name !== 'index.js';
	})
	_.each(fileList, function(file) {
		require(dir+file);
	});
}

executeSetupScripts();