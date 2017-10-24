var viewModel= function(){

	self = this;

	this.searchField = ko.observable('');

	this.listViewLocations = ko.observableArray([]);

	testUser = {
		login:'Me',
		followers: 6
	}

	this.gitHubUser = ko.observable(new User(testUser));

	//Create list view of locations
	/*locations.forEach(function(location)
	{
		self.listViewLocations.push(location);
		console.log(location.name);
	});*/

	//filter the locations to locations that match the user's text input
	self.filterLocations = function()
	{
		var searchTerm = self.searchField().toLowerCase();
		//console.log("The search term in lower is: " + searchTerm)

		var tempLocs = locations.filter(function(location){

  		if (location.name.toLowerCase().includes(searchTerm))
  		{
  			//console.log(location.name);
  			return location.name;
  		}
		});
		self.listViewLocations.removeAll();

		tempLocs.forEach(function(location){
			self.listViewLocations.push(location);
		});

		markers.forEach(function(marker)
		{
			if(!marker.title.toLowerCase().includes(searchTerm))
				marker.setVisible(false);
			else
				marker.setVisible(true);

		});

	};

	self.doSearch = function(username){
		console.log('Making it');
		//console.log(username + ' ' + 'Me');
		//getGitHubUser2('Tunski');
		getGitHubUser('Octocat');
	};

	self.doNext = function(){

		getUserFollowers('Octocat', 2);
	}

	self.loadUser = function(userInfo)
	{
		console.log('I am loading');
		console.log(userInfo);
		this.gitHubUser(new User(userInfo));
	};

	self.loadFollowers = function(followers)
	{
		//clear the followers list
		self.gitHubUser().followers([]);	

		followers.forEach(function(follower){
			self.gitHubUser().followers.push(follower);
		});
	};


	function getUserFollowers(username, page)
	{
		$.ajax({
                 url: 'https://api.github.com/users/' + username+ '/followers?page=' + page,
                 dataType: 'jsonp',
                 //data: data.sessionID
                 success: function(response){
                 	console.log(response);
	          		self.loadFollowers(response.data);
	          }
             });

	};

	function getGitHubUser(username)
	{
		//get user
		$.ajax({
	          url: "https://api.github.com/users/" + username,
	          dataType: "jsonp",
	          success: function(response){
	          	console.log(response);
	          	var userInfo = response.data;
				  //console.log(userInfo);

				if (userInfo !== null)
				{
					self.loadUser(userInfo);
				}
				else
				{
					parseUserData('Information is not available', articleTitle);
				}
			  }
	        }).then(function(){
	        	 getUserFollowers(username, 1);
	        }).fail(function() {
	    		console.log('Oops. It looks like there was a problem.');
	  	});
	};

};

//The user model
var User = function(userInfo){
	//console.log('userinfo   userinfo');
	//console.log(userInfo.login);
	this.userHandle = ko.observable(userInfo.login);
	this.followerCount = ko.observable(userInfo.followers);
	this.followers = ko.observableArray([]);
}


ko.bindingHandlers.enterkey = {
    init: function (element, valueAccessor, allBindings, viewModel) {
        var callback = valueAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                callback.call(viewModel);
                return false;
            }
            return true;
        });
    }
};

ko.applyBindings(new viewModel());