var _ = require('lodash');
var roster = require('./setup/config/roster');
var level1 = require('./setup/config/level1');
var level2 = require('./setup/config/level2');
var level3 = require('./setup/config/level3');

var command = process.argv[2];

if(!command) {
	console.log('usage: npm start [testLevel/Set]');
}

else if(command.includes('level')) {
	upToLevel = parseInt(command[5]);
	if (upToLevel == 1) {
		level1.runLevel();
	}
	else if (upToLevel == 2) {
		level2.runLevel();
	}
	else if (upToLevel == 3) {
		level3.runLevel();
	}
	else {
		console.log('Unidentified Level');
	}
}
else {
	var testLevels = roster.read();
	var setLevel = 0;
	var found = false;
	_.each(testLevels, function(sets) {
		setLevel++;
		_.each(sets, function(set) {
			if(command == set) {
				found = true;
				var upToLevel = setLevel-1;
				if (upToLevel == 0) {
					level1.runLevel(command);
				}
				else if (upToLevel == 1) {
					level2.runLevel(command);
				}
				else if (upToLevel == 2) {
					level3.runLevel(command);
				}
			}
		})
	})
	if (found == false) { console.log('Unidentified Set'); }
}


