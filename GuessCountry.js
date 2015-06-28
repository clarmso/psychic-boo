var loc = [
	{lat: 51.064158, lng: -114.071241, zoom: 16},
	{lat: 42.344866, lng: -71.071247, zoom: 16},
	{lat: 43.450418, lng: -80.497517, zoom: 16},
	{lat: 51.515332, lng: -0.122399, zoom: 16},
	{lat: 48.861715, lng: 2.336221, zoom: 16},
	{lat: 52.367915, lng: 4.900242, zoom: 16},
	{lat: 4.7312924, lng: -74.1046165, zoom: 16},
	{lat: -34.586245, lng: -58.466545, zoom: 16},
	{lat: 47.099953, lng: -56.377437, zoom: 16},
	{lat: 39.027944, lng: 125.741913, zoom: 15},
	{lat: 39.0156744, lng: 125.7381794, zoom: 14},
	{lat: -34.587509, lng: -70.993077, zoom: 16},
	{lat: 37.5488732, lng: 126.9742271, zoom: 17},
	{lat: 35.6696131, lng: 139.7749516, zoom: 15},
	{lat: 1.3014784, lng: 103.8481995, zoom: 16},
	{lat: -27.4774069, lng: 153.0123612, zoom: 16},
	{lat: -33.8751475, lng: 151.1659311, zoom: 16},
	{lat: -37.8122523, lng: 144.9646639, zoom: 15},
	{lat: 48.1540392, lng: 11.5667795, zoom: 16},
	{lat: 53.5495689, lng: 9.9884819, zoom: 16},
	{lat: 51.5139742, lng: 7.4660139, zoom: 17},
	{lat: 50.8533137, lng: 4.3328504, zoom: 16},
	{lat: 51.2227676, lng: 4.3976741, zoom: 16},
	{lat: 50.6391703, lng: 3.0608396, zoom: 16},
	{lat: 49.9257157, lng: 1.0764878, zoom: 17},
	{lat: 44.8401805, lng: -0.5706461, zoom: 16},
	{lat: 40.4208109, lng: -3.7062342, zoom: 17},
	{lat: 38.7142507, lng: -9.145207, zoom: 16},
	{lat: 36.8292151, lng: 10.170732, zoom: 16},
	{lat: 30.072692, lng: 31.2172858, zoom: 16},
	{lat: 37.9863165, lng: 23.7258117, zoom: 16}, 
	{lat: 41.9046049, lng: 12.4879997, zoom: 16},
	{lat: 46.9482812, lng: 7.4502318, zoom: 16},
	{lat: 46.2016181, lng: 6.1398976, zoom: 16},
	{lat: 47.4989923, lng: 8.7289159, zoom: 16},
	{lat: 47.0514957, lng: 8.3055131, zoom: 16},
	{lat:49.2569332, lng: -123.1239135, zoom: 16},
	{lat: 19.394392, lng: -99.1669477, zoom: 15},
	{lat: -34.9188925, lng: -56.1539412, zoom: 16},
	{lat: 34.5948209, lng: -58.3725539, zoom: 16},
	{lat: 40.7623722, lng: -111.9160648, zoom: 16},
	{lat: 48.837791, lng: 2.375084, zoom: 16},
	{lat: 45.5473133, lng: -73.69393, zoom: 16}
];

var score = 0;

var i;
var l;
var geocoder = new google.maps.Geocoder();

function initialize() {
	i = Math.trunc(Math.random() * loc.length);
	l = loc[i];
    var mapOptions = {
        center: { lat: l.lat, lng: l.lng},
		mapTypeId: google.maps.MapTypeId.TERRAIN,		
        zoom: 16,
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
	var longCountry;
	var shortCountry;
	var city;
	var scoreElement;
	geocoder.geocode({
		'latLng': latlng, 
		'language': "en",
		},
		function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {

					addr = results[0].address_components;
					longCountry = "";
					shortCountry = "";
					hint = "";
					for (i=0; i<addr.length; i++) {
						if (addr[i].types.indexOf("country")>-1) {
							longCountry = addr[i].long_name;
							shortCountry = addr[i].short_name;
						}
						if (addr[i].types.indexOf("locality")>-1) {
							city = addr[i].long_name;
						}
					}

					if (longCountry.indexOf(c)>-1  || shortCountry.indexOf(c)>-1) {
						alert('Congrats! This is in '+longCountry+".");
						score = score + 1;
					}	
					else {
						alert('Sorry, this is in '+city+", "+longCountry+".");
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


