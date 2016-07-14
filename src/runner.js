var _ = require('lodash');
var roster = require('./setup/config/roster');
var level1 = require('./setup/config/level1');
var level2 = require('./setup/config/level2');
var level3 = require('./setup/config/level3');
var level4 = require('./setup/config/level4');
var bypass = require('./setup/config/bypass');

var command = process.argv[2];
var mode = process.argv[3];

if(command == 'bypass' || !command) {
	level1.run();
}
else if(command.includes('level')) {
	upToLevel = parseInt(command[5]);
	if(mode == 'bypass') {
		bypass.run(command);
	}
	else if (upToLevel == 1) {
		level1.run();
	}
	else if (upToLevel == 2) {
		level2.run();
	}
	else if (upToLevel == 3) {
		level3.run();
	}
	else if (upToLevel == 4) {
		level4.run();
	}
	else {
		console.log('Unidentified Level');
	}
}
else {
	var allSets = roster.read();
	var setLevel = 0;
	var found = false;
	_.each(allSets, function(sets) {
		setLevel++;
		_.each(sets, function(set) {
			if(command == set) {
				found = true;
				var upToLevel = setLevel-1;
				if (mode == 'bypass') {
					var level = 'level'+setLevel.toString();
					bypass.run(level, command);
				}
				else if (upToLevel == 0) {
					level1.run(command);
				}
				else if (upToLevel == 1) {
					level2.run(command);
				}
				else if (upToLevel == 2) {
					level3.run(command);
				}
				else if (upToLevel == 3) {
					level4.run(command);
				}
			}
		})
	})
	if (found == false) { console.log('Unidentified Set'); }
}


