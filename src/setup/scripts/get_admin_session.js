var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var async = require('async');
var replace = require('replace');
var site = require('../../setup/config/website.js');
var aux = require('../../tests/level2/admin/aux.js');

module.exports = async.series([
	function(callback) {
		xvfb.start();
		browser = nightmare(site.electronOptions);   
		callback(null, null);
	},
	function(callback) {
		console.log(site.adminLogin.user);
		console.log(site.adminLogin.pass);
		browser
            .goto(site.adminUrl)
            .type(aux.adminLoginInput.user, site.adminLogin.user)
            .type(aux.adminLoginInput.pass, site.adminLogin.pass)
            .click(aux.adminLoginButton)
            .wait(aux.adminDashboard)
		    .cookies.get(site.adminCookie.name)
			.then(function (cookie) {
				replace({
					regex: 'ADMIN_COOKIE_PLACEHOLDER',
					replacement: cookie.value,
					paths: ['./setup/config'],
					recursive: true,
				 	silent: true,
				});
			    callback(null, null);
			})
	},
	function(callback) { 
		browser.end().then();
		xvfb.stop();
		callback(null, null);
	}],
	function(err,results) {
		if(err) {
			console.log(err)
		}
	})



