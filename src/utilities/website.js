/* Preliminary configuration file for sitewide variables */
var config = require('config');

//Electron configuration options
var electronShow = true;
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
var htuser = config.get('HTACCESS.user');
var htpass = config.get('HTACCESS.pass');
//ROOT URL
var homeUrl = config.get('ROOT_URLS.qa1');
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
//User Information
var siteLogin = {
  user: config.get('USER_CREDS.user'),
  pass: config.get('USER_CREDS.pass')
}
//CATEGORY PAGE
var itemsExpected = config.get('CATEGORY.itemsExpected');
var expectedTitle = config.get('CATEGORY.name');
var expectedSorting = config.get('CATEGORY.expectedSortingSelected');
var itemsActualSelector = config.get('CATEGORY.itemsActualSelector');
var sortSelect = config.get('CATEGORY.sortSelector');
var viewSelect = config.get('CATEGORY.viewSelector');
//PRODUCT PAGE
var addToCart = config.get('PRODUCT.addToCart');
var addToCartConfirm = config.get('PRODUCT.addToCartConfirm');
//CART PAGE
var itemInfo = config.get('CART.itemInfo');
var counterLabel = config.get('CART.counterLabel');
//LOGIN PAG
var siteLoginInput = {
  user: config.get('LOGIN.userInput'),
  pass: config.get('LOGIN.passInput')
}
var loginButton = config.get('LOGIN.passInput')
var registerButton = config.get('LOGIN.registerButton');
var accountSidebar = config.get('LOGIN.accountSidebar');


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
exports.siteLogin = siteLogin;
//CATEGORY PAGE
exports.itemsExpected = itemsExpected;
exports.expectedTitle = expectedTitle;
exports.expectedSorting = expectedSorting;
exports.itemsActualSelector = itemsActualSelector;
exports.sortSelect = sortSelect;
exports.viewSelect = viewSelect;
//PRODUCT PAGE
exports.addToCart = addToCart;
exports.addToCartConfirm = addToCartConfirm;
//CART PAGE
exports.itemInfo = itemInfo;
exports.counterLabel = counterLabel;
//LOGIN PAGE
exports.siteLoginInput = siteLoginInput;
exports.loginButton = loginButton;
exports.registerButton = registerButton;
exports.accountSidebar = accountSidebar;

exports.expectedBody = expectedBody;

module.exports = exports;



