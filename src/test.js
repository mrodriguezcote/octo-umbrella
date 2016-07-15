var config = require('config');

var clientName = config.get('Client.rootURL');

console.log(clientName);