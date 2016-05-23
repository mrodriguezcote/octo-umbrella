var Xvfb = require('xvfb'), xvfb = new Xvfb();
var nightmare = require('nightmare'), browser;
var async = require('async');
var replace = require('replace');
var site = require('../../setup/site/website.js');
var aux = require('../../tests/level2/admin/aux.js');

async.series([
	function(callback) {
		xvfb.start();
		browser = nightmare(site.electronOptions);   
		callback(null, null);
	},
	function(callback) {
		browser
            .goto(site.adminUrl)
            .type(aux.adminLoginInput.user, aux.adminLogin.user)
            .type(aux.adminLoginInput.pass, aux.adminLogin.pass)
            .click(aux.adminLoginButton)
            .wait(aux.adminDashboard)
		    .cookies.get(site.adminCookie.name)
			.then(function (cookie) {
				replace({
					regex: 'ADMIN_COOKIE_PLACEHOLDER',
					replacement: cookie.value,
					paths: ['./setup/site'],
					recursive: true,
				 	silent: true,
				});
			    callback(null, null);
			})
	},
	function(callback) {
		xvfb.stop(); 
		browser.end().then();
		callback(null, null);
	}],
	function(err,results) {
		if(err) {
			console.log(err)
		}
	})

