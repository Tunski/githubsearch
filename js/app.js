var viewModel = function () {

	self = this;

	//the user's search query
	this.searchField = ko.observable('');

	this.githubUser = ko.observable('');

	self.doUserSearch = function (username) {
		if (username.length < 1)
			return;
		getGithubUser(username);
	};

	self.moveNext = function () {
		self.pageTracker(1);
		getUserFollowers(self.githubUser().userHandle(), self.githubUser().currentPage());
	}

	self.movePrev = function () {
		self.pageTracker(-1);
		getUserFollowers(self.githubUser().userHandle(), self.githubUser().currentPage());
	}

	self.allowPrev = ko.computed(function () {
		var user = self.githubUser();
		if (!user.currentPage)
			return false;

		if (user.currentPage() <= 1)
			return false;

		return true;
	}, self);

	self.allowNext = ko.computed(function () {
		var user = self.githubUser();
		if (!user.currentPage)
			return false;

		if (user.currentPage() >= user.lastFollowerPage())
			return false;

		return true;
	}, self);

	this.pageTracker = function (delta) {

		self.githubUser().currentPage(Number(self.githubUser().currentPage()) + Number(delta));

		if (self.githubUser().currentPage() <= 1) {
			self.githubUser().currentPage(1);
		}
		else if (self.githubUser().currentPage() >= self.githubUser().lastFollowerPage()) {
			self.githubUser().currentPage(self.githubUser().lastFollowerPage());
		}
	};

	self.loadUser = function (userInfo) {
		this.githubUser(new user(userInfo));
	};

	self.loadFollowers = function (followersResponse) {

		var followers = followersResponse.data;

		//clear the followers list
		//TODO:implement data caching at some point
		self.githubUser().followers([]);

		followers.forEach(function (follower) {
			self.githubUser().followers.push(follower);
		});

		//Need to find a way to only set the last page once
		var meta = followersResponse.meta;
		if (meta.Link) {
			var lastPageMeta = meta.Link[1];
			var metaRelLink = lastPageMeta[1];

			console.log('What is rel: ' + metaRelLink.rel);

			if (metaRelLink.rel == 'last') {
				var lastPageUrl = lastPageMeta[0];

				var value = getParameterValueFromURL('page', lastPageUrl);

				self.githubUser().lastFollowerPage(value);
			}
		}
	};

	function getUserFollowers(username, page) {
		$.ajax({
			url: 'https://api.github.com/users/' + username + '/followers?page=' + page,
			dataType: 'jsonp',
			success: function (response) {
				console.log(response);
				self.loadFollowers(response);
			}
		});

	};

	function getGithubUser(username) {
		//get user
		$.ajax({
			url: "https://api.github.com/users/" + username,
			dataType: "jsonp",
			success: function (response) {
				console.log(response);
				var userInfo = response.data;

				if (userInfo !== null) {
					self.loadUser(userInfo);
				}
				else {
					parseUserData('Information is not available', articleTitle);
				}
			}
		}).then(function () {
			getUserFollowers(username, 1);
		}).fail(function () {
			console.log('Oops. It looks like there was a problem.');
		});
	};

};

//The user model
//The follower is also a user. But ignoring this for now
var user = function (userInfo) {
	this.userHandle = ko.observable(userInfo.login);
	this.userAvatarURL = ko.observable(userInfo.avatar_url)
	this.followerCount = ko.observable(userInfo.followers);
	this.followers = ko.observableArray([]);
	this.currentPage = ko.observable(1);
	this.lastFollowerPage = ko.observable(1);
}

//Binding for enter key press
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