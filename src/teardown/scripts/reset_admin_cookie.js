var replace = require('replace');
var site = require('../../setup/site/website.js');

replace({
	regex: site.adminCookie.value,
	replacement: 'ADMIN_COOKIE_PLACEHOLDER',
	paths: ['./setup/site'],
	recursive: true,
	silent: true,
});



