var replace = require('replace');
var site = require('../../setup/config/website.js');

replace({
	regex: site.adminCookie.value,
	replacement: 'ADMIN_COOKIE_PLACEHOLDER',
	paths: ['./setup/config'],
	recursive: true,
	silent: true,
});