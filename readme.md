# GitHub Search Service

# About

Companies sometimes require a demonstration of one’s skills and abilities as part of their interview process. In order to showcase my web development skills, I have undertaken a coding challenge to build a single page app that allows users to search, retrieve and display Github user information. The app is hosted at http://tunde.me/githubsearch .


## Challenge Requirements
Create a service that allows for a user to search for a GitHub username using GitHub’s API. On a successful search return, display the user's GitHub handle, follower count, and a list of the user's followers.

Create a "load more" button that, when clicked, fetches the next payload of followers. This button should persist until there are no more pages of followers to fetch.

# Getting Started 
Download the files and start a server from within the directory. Navigate to index.html. Type in the username of a github user and press enter or click the 'Search Github' button. Upon a successful search, the user's information and followers will be displayed. The next and previous buttons will be enabled if a user has more than 30 followers.

### Starting up a server 

##### Python 2
``` python -m SimpleHTTPServer portnumber ```

##### Python 3
``` python -m http.server portnumber ```


##### Using Http-Server

``` http-server -p portnumber ```

##### Using File Protocol

You can also run this using file protocol. Simply open index.html in a browser of your choice.

# Technical
Due to time constraints and the relatively small size of the project, I chose tools and web frameworks for which I already have some familiarity. One such framework is [Knockout](http://knockoutjs.com) - which does not contain the bells and whistles of some beefier frameworks, but allows one to get up and running quickly. 

### Frameworks and Libraries
[Knockout](http://knockoutjs.com). A simple, lightweight framework for single page apps that gets the job done. 
[jQuery](https://jquery.com). An awesome JavaScript library that allows one to do more with less.

### Unit Testing
[Jasmine](https://jasmine.github.io). Jasmine is an open source testing framework and can run on any JavaScript enabled platform. 
The tests are integrated into the app in the development environment.  However, the unit tests are not in the production code.

#### Unit Test coverage so far include:

* **Search Bar** test suite
	* Tests that search bar is visible
    * Tests that search bar button is disabled by default

#### Other
The folder/files have been structured such that is allows for good separation of concerns (HTML, CSS, JavaScript, Unit Tests, etc).

# Deployment
The deployed code excludes unit test integrations. It has been minified to reduce file size and conserve bandwidth. The production code is packaged in the prodpackage folder. Deploy the contents of prodpackage to your server.


# Future Improvements

### Functional Features
* Add loading message/indicator while additional followers are being retrieved.

* Include additional relevant user and follower information.

* Show username suggestions if a user searches for an invalid or incorrect username

* Add a type ahead feature when typing in a username

* Including links to the user's and followers' profile


### Technical Features
* Error logging and handling

* Improve unit test coverage

* Data Caching. Keep from having to make a new api request for already loaded data.

* Include package manager in the development environment to streamline and automate processes such as building, testing and deployment.