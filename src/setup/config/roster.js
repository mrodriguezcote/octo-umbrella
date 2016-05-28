var _ = require('lodash');
var fs = require('fs');

/* Reads the src/tests directory and returns the number of levels,
and the name of each test set within each level */
module.exports.read = function() {
	var roster = [];
	var dir = process.cwd()+'/tests/';
	levelList = fs.readdirSync(dir);
	_.filter(levelList, function(file) {
		return file.name !== 'index.js';
	})
	_.each(levelList, function(file) {
		var subdir = dir+file;
		setList = fs.readdirSync(subdir);
		roster.push(setList);
	});
	return(roster);
}