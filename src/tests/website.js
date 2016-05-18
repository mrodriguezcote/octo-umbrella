/* Preliminary configuration file for sitewide variables */

//Electron configuration options
var electronShow = false;
var electronPartition = 'nopersist';
var electronOptions = {
  show: electronShow,
  width: 1400,
  height: 800,
  webPreferences:{
    partition: electronPartition,
  }
}
var electronMobileOptions = {
  show: electronShow,
  width: 400,
  height: 800,
  webPreferences:{
    partition: electronPartition,
  }
}

//General URLs:
var styleGuide = 'http://staging.reeds.com/styleguide';
var homeUrl = 'http://rds.qa-1.blueacorn.net/';
//var homeUrl = 'http://staging.reeds.com/';
var adminUrl = 'http://rds.qa-1.blueacorn.net/admin/admin/';
//var adminUrl = 'http://staging.reeds.com/admin/admin/'
var adminCache = adminUrl+'cache/'
var checkoutUrl = homeUrl+'checkout/';
var cartUrl = homeUrl+'checkout/cart/';
var loginUrl = homeUrl+'customer/account/login/';
var registerUrl = homeUrl+'customer/account/create/';
var categoryUrl = homeUrl+'test-category.html/';
var productUrl = homeUrl+'batest.html/';

//For logging in admin on page load:
var adminCookie = {
  name: 'admin',
  value: '0a7ff813e0a748487bac6457c0494891'
}

//Test Catalog Pages:
var testSimpleURL = homeUrl+'batest.html/';
var adminTestSimple = homeUrl+'admin/catalog/product/edit/id/1/';

//Admin Cache Management page
var cacheFlush = '#flush_magento';
var cacheFlushConfirm = '.message.message-success.success';

//Product Page
/*TODO: Need to think if each major page should have a page object
Different features might use the same page object functions/variables */
var addToCart = '#product-addtocart-button';
var addToCartConfirm = '.message-success';


//Exporting
exports.electronOptions = electronOptions;
exports.electronMobileOptions = electronMobileOptions;
exports.styleGuide = styleGuide;
exports.homeUrl = homeUrl;
exports.adminUrl = adminUrl;
exports.adminCache = adminCache;
exports.checkoutUrl = checkoutUrl;
exports.cartUrl = cartUrl;
exports.loginUrl = loginUrl;
exports.registerUrl = registerUrl;
exports.categoryUrl = categoryUrl;
exports.productUrl = productUrl;
exports.adminCookie = adminCookie;
exports.testSimpleURL = testSimpleURL;
exports.adminTestSimple = adminTestSimple;
exports.cacheFlush = cacheFlush;
exports.cacheFlushConfirm = cacheFlushConfirm;
exports.addToCart = addToCart;
exports.addToCartConfirm = addToCartConfirm;

module.exports = exports;



