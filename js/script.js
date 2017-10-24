var map;
var infowindow;

//Initialize the map, markers, and other necessary functions
function initMap() {
	// Create new map. Center it using geocode for Birmingham, AL
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 33.5206608, lng: -86.80248999999998},
	  zoom: 13,
	  mapTypeControl: false
	});

	initMarkers();
	initInfoWindow();

	//console.log('In the script');
}

var markers =[];

function initInfoWindow()
{
	infowindow = new google.maps.InfoWindow({
	content: '<div></div>'//contentString
	});
}

function initMarkers()
{
	// Create an array of markers from locations data
	for (var i = 0; i < locations.length; i++) {
		// Get the latlng from the locations model.
		var position = locations[i].latlng;
		var name = locations[i].name;

		// Create a marker per location, and put into markers array.
		var marker = new google.maps.Marker({
			position: position,
			title: name,
			animation: google.maps.Animation.DROP,
			//icon: defaultIcon,
			id: i+1,
			map:map
		});
		// Push the marker to our array of markers.
		markers.push(marker);

		//make the marker bounce when clicked
		marker.addListener('click', function(){ 
			animateMarker(this);
		});

		marker.addListener('click', function() {
			showWikiInfo(this, infowindow);
			//infowindow.open(map, this);
		});
	}
}

function showWikiInfo(marker, infowindow)
{
	getWikiInfoWindow(marker, infowindow);
	infowindow.open(map, marker);
}

function getWikiInfoWindow(marker, infowindow)
{
	console.log('I am groot');

	if (infowindow.marker != marker) {
        // Clear the infowindow content.
    	infowindow.setContent('');
		infowindow.marker = marker;
		// Make sure the marker property is cleared if the infowindow is closed.
		infowindow.addListener('closeclick', function() {
		infowindow.marker = null;
		});

		var loc = findMarkerLocationInfo(marker.id);

		console.log(loc);

		var article = loadWikiArticle(loc.wikiArticleTitle);

        //infowindow.setContent('<div>' + marker.title + '</div><div id="pano">'+ article +'</div>');
	}
}

function setInfoWindowContent(article, articleTitle)
{
	infowindow.setContent('<div><b>' + infowindow.marker.title+ '</b></div><div id="">'+ article +'</div><div><a href="https://en.wikipedia.org/wiki/' + articleTitle+'">More</></div>');
}


function findMarkerLocationInfo(markerID)
{
	var loc;
	locations.forEach(function(location)
		{
			if(location.id == markerID)
			{
				console.log(location.name);
				loc = location;
				return location;
			}

			return null;

		});
	return loc;
};

function animateMarker(marker){
  	turnOffAnimationOnAllMarkers();

	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} 
	else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
};

//turn off animation on all markers
function turnOffAnimationOnAllMarkers()
{
	for (var i = 0; i < markers.length; i++) {

		var tempMarker = markers[i];

		if (tempMarker.getAnimation() !== null) {
			  tempMarker.setAnimation(null);
			};
	}
};


function loadWikiArticle(articleTitle)
{
	$.ajax({
          url: "https://en.wikipedia.org/w/api.php?action=query&titles=" + articleTitle + "&format=json&prop=revisions&rvprop=content",
          dataType: "jsonp",
          success: function(response){
          var articles = response.query.pages;
          console.log(articles);
          	//get articles
          	var firstItem;
			for(var key in articles) {
			    if(articles.hasOwnProperty(key)) {
			        firstItem = articles[key];
			        console.log(firstItem);
			        break;
			    }
			};

			if (firstItem !== null)
			{

				var latestArticleOjbect = firstItem.revisions[0];

				var latestArticle = latestArticleOjbect["*"];

				var textStart = latestArticle.indexOf("'''", 0);

				latestArticle = latestArticle.substring(textStart, textStart + 250) + "...";

				//console.log(latestArticle);

				setInfoWindowContent(latestArticle, articleTitle);
			}
			else
			{
				setInfoWindowContent('Information is not available', articleTitle);
			}

          }
        }).fail(function() {
    		console.log('There was a problem with the wiki API call');
    		setInfoWindowContent('Information is not available', articleTitle);

  		});
	//console.log("I am groot hh hh h h");
	return false;
};

function handleGoogleApiError()
{
	window.alert('Unable to load Google Maps API');
}
