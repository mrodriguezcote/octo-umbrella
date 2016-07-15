//HELPER FUNCTIONS FOR ALL TESTS
var deleteLinks = ['http://www.bbb.org/myrtle-beach/business-reviews/jewelers-retail/reeds-jewelers-in-wilmington-nc-11002451#sealclick'];
var clean = function(array) {

    deleteLinks.push('');
    for (var j=0; j<deleteLinks.length; j++) {
        for (var i=0; i<array.length; i++) {
            if (array[i] === deleteLinks[j]) {array.splice(i, 1); i--;}
        }
    }
    cleanArray = array.filter(function(elem, pos) {
        return array.indexOf(elem) === pos;
    })
    return cleanArray;

}

exports.clean = clean;

module.exports = exports;