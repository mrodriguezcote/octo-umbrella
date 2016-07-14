/* Preliminary configuration file for sitewide variables */

//Electron configuration options
var electronShow = false;
var electronPartition = 'nopersist';
var electronOptions = {
  show: electronShow,
  width: 1400,
  height: 800,
  gotoTimeout: 8000,
  webPreferences:{
    partition: electronPartition,
  }
}
var electronMobileOptions = {
  show: electronShow,
  width: 400,
  height: 800,
  gotoTimeout: 8000,
  webPreferences:{
    partition: electronPartition,
  }
}

//Htaccess credentials
var htuser = 'blueacorn';
var htpass = 'pass4blueacorn';

//ROOT URL
//var homeUrl = 'http://rds.qa-1.blueacorn.net/';
var homeUrl = 'http://staging.reeds.com/';

//General URLs
var adminUrl = homeUrl+'admin/admin/';
var adminCache = adminUrl+'cache/'
var checkoutUrl = homeUrl+'checkout/';
var cartUrl = homeUrl+'checkout/cart/';
var loginUrl = homeUrl+'customer/account/login/';
var registerUrl = homeUrl+'customer/account/create/';
var categoryUrl = homeUrl+'test-category.html/';
var productUrl = homeUrl+'batest.html/';
var searchUrl = homeUrl+'catalogsearch/result/?q=';
//Staging
var stageHomeUrl = 'http://staging.reeds.com/';
var stageAdminUrl = 'http://staging.reeds.com/admin/admin/';
var styleGuide = 'http://staging.reeds.com/styleguide';

//User Information
var siteLogin = {
  user: 'marco@blueacorn.com', 
  pass: 'pass4marco'
}
var siteRegister = {
  first: 'Test',
  last: 'User',
  email: 'test@blueacorn.com',
  pass: 'pass4test'
}

//Admin Cache Management page
var cacheFlush = '#flush_magento';
var cacheFlushConfirm = '.message.message-success.success';

//Product Page
var addToCart = '#product-addtocart-button';
var addToCartConfirm = '.message-success';

//First line of a successful page load response body string
var expectedBody = '<!doctype html>';


//Exporting
exports.electronOptions = electronOptions;
exports.electronMobileOptions = electronMobileOptions;
exports.htuser = htuser;
exports.htpass = htpass;
exports.homeUrl = homeUrl;
exports.adminUrl = adminUrl;
exports.adminCache = adminCache;
exports.checkoutUrl = checkoutUrl;
exports.cartUrl = cartUrl;
exports.loginUrl = loginUrl;
exports.registerUrl = registerUrl;
exports.categoryUrl = categoryUrl;
exports.productUrl = productUrl;
exports.searchUrl = searchUrl;
exports.stageHomeUrl = stageHomeUrl;
exports.stageAdminUrl = stageAdminUrl;
exports.styleGuide = styleGuide;
exports.siteLogin = siteLogin;
exports.siteRegister = siteRegister;
exports.cacheFlush = cacheFlush;
exports.cacheFlushConfirm = cacheFlushConfirm;
exports.addToCart = addToCart;
exports.addToCartConfirm = addToCartConfirm;
exports.expectedBody = expectedBody;

module.exports = exports;



