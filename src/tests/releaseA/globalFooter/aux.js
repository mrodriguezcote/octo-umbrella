/* Feature auxillary file for Global Footer
This file contains all feature-related artifacts such as URLs,
admin configuration pages, feature-specific content, etc. */

var site = require('../../website.js');

//Timeout for feature tests
var specTime = 25000;


//////////////////////// URLs ////////////////////////
//Admin configuration page
var adminFooter = site.adminUrl+'system_config/edit/section/ba_footer/';

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
//Zip Code field in footer links
var footerZipHeight = 42;
var footerZipWidth = 145;
var footerZipText = 'Enter zipcode';

//////////////////////// SELECTORS ////////////////////////
//Admin Configuration
var adminSocialEnabled = '#ba_footer_social_social_block_enabled';
var adminSocialUrls = {
	facebook: '#ba_footer_social_footer_facebook_url',
	pinterest: '#ba_footer_social_footer_pinterest_url',
	twitter: '#ba_footer_social_footer_twitter_url',
	youtube: '#ba_footer_social_footer_youtube_url',
	instagram: '#ba_footer_social_footer_instagram_url',
	gplus: '#ba_footer_social_footer_gplus_url',
	wanelo: '#ba_footer_social_footer_wanelo_url'
}
//Social LInks
var socialBlock = '.social-container';
var socialSelectorRoot = 'body>div.page-wrapper>footer>div.footer-social-container>div.social-container>div.social-icon.';
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
var footerLinksBlock = '.footer-links';
var footerLinksColumn = '.links-column';
var footerLinksExpanded = '.links-column.expanded';
var lastColumn = 'body>div.page-wrapper>footer>div.footer-links-container>div>div:nth-child('+columns+')>h4';
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
exports.footerZipHeight = footerZipHeight;
exports.footerZipWidth = footerZipWidth;
exports.footerZipText = footerZipText;
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
exports.footerLinksBlock = footerLinksBlock;
exports.footerLinksColumn = footerLinksColumn;
exports.footerLinksExpanded = footerLinksExpanded;
exports.lastColumn = lastColumn;
exports.zipField = zipField;
exports.copyrightBlock = copyrightBlock;

module.exports = exports;