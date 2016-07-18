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
var rootUrl = config.get('ROOT');
//General URLs
var homeUrl = rootUrl+config.get('HOMEPAGE.url');
var categoryUrl = rootUrl+config.get('CATEGORY.url');
var productUrl = rootUrl+config.get('PRODUCT.url');
var cartUrl = rootUrl+config.get('CART.url');
var checkoutUrl = rootUrl+config.get('CHECKOUT.url');
var loginUrl = rootUrl+config.get('LOGIN.url');
var registerUrl = rootUrl+config.get('REGISTER.url');
var searchUrl = rootUrl+config.get('SEARCH.url');
//User Information
var siteLogin = {
  user: config.get('USER_CREDS.user'),
  pass: config.get('USER_CREDS.pass')
}
//HOMEPAGE
var expectedBody = config.get('HOMEPAGE.expectedBody');
var minLinks = config.get('HOMEPAGE.minLinks');
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
//LOGIN PAG
var siteLoginInput = {
  user: config.get('LOGIN.userInput'),
  pass: config.get('LOGIN.passInput')
}
var loginButton = config.get('LOGIN.loginButton')
var accountSidebar = config.get('LOGIN.accountSidebar');


//Exporting
exports.electronOptions = electronOptions;
exports.electronMobileOptions = electronMobileOptions;
exports.htuser = htuser;
exports.htpass = htpass;
exports.homeUrl = homeUrl;
exports.categoryUrl = categoryUrl;
exports.productUrl = productUrl;
exports.cartUrl = cartUrl;
exports.checkoutUrl = checkoutUrl;
exports.loginUrl = loginUrl;
exports.registerUrl = registerUrl;
exports.searchUrl = searchUrl;
exports.siteLogin = siteLogin;
//HOMEPAGE
exports.expectedBody = expectedBody;
exports.minLinks = minLinks;
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
//LOGIN PAGE
exports.siteLoginInput = siteLoginInput;
exports.loginButton = loginButton;
exports.accountSidebar = accountSidebar;

module.exports = exports;



