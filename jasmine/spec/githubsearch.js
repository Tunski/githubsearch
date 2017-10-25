/*
//Test Data
testUser = {
    login:'Me',
    followers: 6
}
*/

//this.gitHubUser = ko.observable(new user(testUser));

$(function() {
    describe('Search Bar', function(){

         it('should be visible', function(){
            expect($( "#search-view" ).hasClass( "search" )).toBe(true);

         });

          it('Button should be disabled by default', function() {
            var searchButton = $('#search-button');
            
            expect($( "#search-view" ).hasClass( "disabled" )).toBe(true);

          });
/*
          it('button should enable when at least one character is typed in search bar', function() {
            var searchButton = $('#search-button');
            
            //perform click to search
            searchButton.trigger( "click" );
            expect($( "#search-view" ).hasClass( "disabled" )).toBe(false);

            //perform click to search
            menuIcon.trigger( "click" );
            expect($( "body" ).hasClass( "disabled" )).toBe(true);

          });*/
    });

}());