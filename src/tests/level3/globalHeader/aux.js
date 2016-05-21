/* Feature auxillary file for Global Header
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../website.js');

//Timeout for feature tests
var specTime = 8000;

//////////////////////// URLs ////////////////////////
//Admin configuration page
var adminHeader = site.adminUrl+'system_config/edit/section/ba_header/';

//////////////////////// VALUES ////////////////////////
//Header block
var headerWidth = 1024;
//Main Logo
var logoHeight = 75;
var logoWidth = 194;
//Search Bar
var searchHeight = 42;
var searchWidth = 280;
var searchText = 'Search Keyword or Item';

//////////////////////// SELECTORS ////////////////////////
//Admin COnfiguration
var adminChatEnabled = '#ba_header_live_chat_live_chat_enabled';
var adminPhone = {
	enabled: '#ba_header_phone_number_phone_enabled',
	selected: '#ba_header_phone_number_phone_cms_page option:selected'
}
var adminStoreLocator = {
	enabled: '#ba_header_store_locator_store_locator_enabled',
	title: '#ba_header_store_locator_store_locator_title'
}
var adminReedsCard = {
	enabled: '#ba_header_reeds_card_reeds_card_enabled',
	title: '#ba_header_reeds_card_reeds_card_title',
	block: '#ba_header_reeds_card_reeds_card_cms_block option:selected',
	page: '#ba_header_reeds_card_reeds_card_cms_page option:selected'
}
//Header Block
var  headerBlock = '.header.content';
//Main Logo
var logo = {
	main: '.logo',
	desktop: '.desktop-logo',
	mobile: '.mobile-logo'
}
//Search Bar
var searchField = '#search_mini_form';
var mobileSearchField = '.search';
//Hamburger Menu
var hamburger = '.action.nav-toggle';
//Header Links
var headerLinks = {
	chat: '.live-chat-container',
	phone: '.phone-number-container',
	storeLocator: '.store-locator-container',
	reedsCard: '.reeds-card-container'
}
//Phone Link
var phoneLink = 'body>div.page-wrapper>header>div>div>div.panel.header>div.phone-number-container>a>span';
//Reeds Card Link
var cardLink = 'body > div.page-wrapper>header>div>div>div.panel.header>div.reeds-card-container.top-links-container>a>span'

exports.specTime = specTime;
exports.adminHeader = adminHeader;
exports.headerWidth = headerWidth;
exports.logoHeight = logoHeight;
exports.logoWidth = logoWidth;
exports.searchHeight = searchHeight;
exports.searchWidth = searchWidth;
exports.searchText = searchText;
exports.adminChatEnabled = adminChatEnabled;
exports.adminPhone = adminPhone;
exports.adminStoreLocator = adminStoreLocator;
exports.adminReedsCard = adminReedsCard;
exports.headerBlock = headerBlock;
exports.logo = logo;
exports.searchField = searchField;
exports.mobileSearchField = mobileSearchField;
exports.hamburger = hamburger;
exports.headerLinks = headerLinks;
exports.phoneLink = phoneLink;
exports.cardLink = cardLink;

module.exports = exports;