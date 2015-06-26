var loc = [
	{lat: 51.064158, lng: -114.071241},
	{lat: 42.344866, lng: -71.071247},
	{lat: 43.450418, lng: -80.497517},
	{lat: 51.515332, lng: -0.122399},
	{lat: 48.861715, lng: 2.336221},
	{lat: 52.367915, lng: 4.900242},
	{lat: 4.735719, lng: -74.092686},
	{lat: -34.586245, lng: -58.466545},
	{lat: 47.099953, lng: -56.377437},
	{lat: 39.027944, lng: 125.741913},
	{lat: 39.918496, lng: 116.400227},
	{lat: -34.587509, lng: -70.993077}
];

var score = 0;

var i;
var l;
var geocoder = new google.maps.Geocoder();
var myzoom = 16;

function initialize() {
	i = Math.trunc(Math.random() * loc.length);
	l = loc[i];
    var mapOptions = {
        center: { lat: l.lat, lng: l.lng},
		mapTypeId: google.maps.MapTypeId.TERRAIN,		
        zoom: myzoom,
		disableDefaultUI: true,
		disableDoubleClickZoom: true,
		keyboardShortcuts: false,
		zoomControl: false,
		scrollwheel: false,
		draggable: false,
		clickable: false,
		
		styles: [
			{	
   				"featureType": "transit",
   		 		"elementType": "labels",
		    	"stylers": [{ "visibility": "off" }]
  			},{
    			"featureType": "poi",
    			"elementType": "labels",
    			"stylers": [{ "visibility": "off" }]
		  	},{
    			"featureType": "administrative",
    			"stylers": [{ "visibility": "off" }]
  			}
		]
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function validateCountry() {
	var c = document.getElementById("country").value.trim();
	var latlng = new google.maps.LatLng(l.lat, l.lng);	
	var addr;
	var country;
	var scoreElement;
	geocoder.geocode({'latLng': latlng},
		function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					addr = results[0].address_components;
					country = "";
					for (i=0; i<addr.length; i++) {
						if (addr[i].types.indexOf("country")>-1)
							country = addr[i].long_name;
					}
					if (country.indexOf(c)>-1) {
						alert('Congrats! This is '+country);
						score = score + 1;
					}	
					else {
						alert('Sorry, this is '+country);
					}
					scoreElement = document.getElementById("score");
					scoreElement.innerHTML = "Score: "+score;
					initialize();

				} else {
					alert('Google Geocoder cannot query result');
				}
			} else {
					alert('Google Geocoder Service failed: '+status);
			}
		}
	);
}

google.maps.event.addDomListener(window, 'load', initialize)


