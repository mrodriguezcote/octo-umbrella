//HipChat reporting function
module.exports.report = function(pass) {
	var needle = require('needle');
	if(pass) {
		var message = {"message": "All tests passed"};
	}
	else if(!pass) {
		var message = {"message": "At least one test failed"};
	}
	var roomID = '2936119';
	var apiUrl = 'https://api.hipchat.com/v2/room/'+roomID+'/notification'
	var options = {
		headers: {
	    	"Authorization": "Bearer JARUTFwhp2LVWzTGp4pViINSGtWWgn3CLtTatKjk",
	  	}
	};
	needle.post(apiUrl, message , options, function(err, resp) {
		//Sends notification to specified hipchat room
	});	
}