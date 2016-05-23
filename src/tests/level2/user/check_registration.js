// var site = require('../../../setup/site/website.js');
// var aux = require('./aux.js');
// var nightmare = require('nightmare'), browser;

// xdescribe("User", function() {
   
//     beforeAll(function() { 
//         xvfb.start(); 
//         browser = nightmare(site.electronOptions); 
//     });
    
//     afterAll(function() { 
//         browser.end().then();
//         xvfb.stop(); 
//     });

//     /* Register for an account through the front end and ensure
//     account is created */
//     it("is able to register through front end", function(done) {
        
//         browser
//             .goto(site.registerUrl)
//             .type(aux.siteRegisterInput.first, aux.siteRegister.first)
//             .type(aux.siteRegisterInput.last, aux.siteRegister.last)
//             .type(aux.siteRegisterInput.email, aux.siteRegister.email)
//             .type(aux.siteRegisterInput.pass, aux.siteRegister.pass)
//             .type(aux.siteRegisterInput.passConfirm, aux.siteRegister.pass)
//             .click(aux.registerButton)
//             .wait(aux.accountSidebar)
//             .title()
//             .then(function (title) {
//                 expect(title).toBe('My Account')
//                 done();
//             })

//     }, aux.specTime);

//     /*TODO: Need to delete newly created account from database. Ideally
//     through a node-mysql bridge to delete the entry without the front end */


// });