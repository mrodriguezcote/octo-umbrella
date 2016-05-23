/* Feature auxillary file for Global Footer
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../../setup/site/website.js');

//Timeout for feature tests
var specTime = 25000;


//////////////////////// URLs ////////////////////////
//Admin configuration page
var adminFooter = site.adminUrl+'system_config/edit/section/ba_barter/';

//////////////////////// VALUES ////////////////////////
//Footer links number of columns in place
var columns = 6;
//Max number of social links
var socialLinks = 5;
//Newsletter
var newsletterHeight = 40;
var newsletterWidth = 220;
var mobileNewsletterWidth = 312;
var newsletterText = 'Exclusive Offers: Enter Email'
//Footer accordion
var accordionHeight = 300;
var accordionWidth = 400;
//Zip Code field in barter links
var barterZipHeight = 42;
var barterZipWidth = 145;
var barterZipText = 'Enter zipcode';

//////////////////////// SELECTORS ////////////////////////
//Admin Configuration
var adminSocialEnabled = '#ba_barter_social_social_block_enabled';
var adminSocialUrls = {
	facebook: '#ba_barter_social_barter_facebook_url',
	pinterest: '#ba_barter_social_barter_pinterest_url',
	twitter: '#ba_barter_social_barter_twitter_url',
	youtube: '#ba_barter_social_barter_youtube_url',
	instagram: '#ba_barter_social_barter_instagram_url',
	gplus: '#ba_barter_social_barter_gplus_url',
	wanelo: '#ba_barter_social_barter_wanelo_url'
}
//Social LInks
var socialBlock = '.social-container';
var socialSelectorRoot = 'body>div.page-wrapper>barter>div.barter-social-container>div.social-container>div.social-icon.';
var facebookSelector = socialSelectorRoot+'facebook>a';
var pinterestSelector = socialSelectorRoot+'pinterest>a';
var twitterSelector = socialSelectorRoot+'twitter>a';
var youtubeSelector = socialSelectorRoot+'youtube>a';
var instagramSelector = socialSelectorRoot+'instagram>a';
var googleplusSelector = socialSelectorRoot+'gplus>a';
var waneloSelector = socialSelectorRoot+'wanelo>a';
//Newsletter
var newsletterField = '#newsletter';
//Footer Links
var barterLinksBlock = '.barter-links';
var barterLinksColumn = '.links-column';
var barterLinksExpanded = '.links-column.expanded';
var lastColumn = 'body>div.page-wrapper>barter>div.barter-links-container>div>div:nth-child('+columns+')>h4';
var zipField = '.find-store-form';
//Copyright
var copyrightBlock = '.copyright';


exports.specTime = specTime;
exports.adminFooter = adminFooter;
exports.columns = columns;
exports.socialLinks = socialLinks;
exports.newsletterHeight = newsletterHeight;
exports.newsletterWidth = newsletterWidth;
exports.mobileNewsletterWidth = mobileNewsletterWidth;
exports.newsletterText = newsletterText
exports.accordionHeight = accordionHeight;
exports.accordionWidth= accordionWidth;
exports.barterZipHeight = barterZipHeight;
exports.barterZipWidth = barterZipWidth;
exports.barterZipText = barterZipText;
exports.adminSocialEnabled = adminSocialEnabled;
exports.adminSocialUrls = adminSocialUrls;
exports.socialBlock = socialBlock;
exports.facebookSelector = facebookSelector;
exports.pinterestSelector = pinterestSelector;
exports.twitterSelector = twitterSelector;
exports.youtubeSelector = youtubeSelector;
exports.instagramSelector = instagramSelector;
exports.googleplusSelector = googleplusSelector;
exports.waneloSelector = waneloSelector;
exports.newsletterField = newsletterField;
exports.barterLinksBlock = barterLinksBlock;
exports.barterLinksColumn = barterLinksColumn;
exports.barterLinksExpanded = barterLinksExpanded;
exports.lastColumn = lastColumn;
exports.zipField = zipField;
exports.copyrightBlock = copyrightBlock;

module.exports = exports;