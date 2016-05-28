var _ = require('lodash');
var roster = require('./setup/config/roster');
var level1 = require('./setup/level1');
var level2 = require('./setup/level2');
var level3 = require('./setup/level3');

var command = process.argv[2];

if(!command) {
	console.log('provide arg');
} 
else if(command == 'level1') {
	level1.runLevel();
}
else if(command == 'level2') {
	level2.runLevel();
}
else if(command == 'level3') {
	level3.runLevel();
}
else {
	console.log('Work In Progress');
	var testLevels = roster.read();
	var whichLevel = 0;
	_.each(testLevels, function(sets) {
		whichLevel++;
		_.each(sets, function(set) {
			if(command == set) {
				console.log(whichLevel);
			}
		})
	})


}