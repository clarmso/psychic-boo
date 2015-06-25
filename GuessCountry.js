var loc = [
	{lat: 51.064158, lng: -114.071241, zoom: 15},
	{lat: 42.344866, lng: -71.071247, zoom: 15},
	{lat: 43.450418, lng: -80.497517, zoom: 15},
	{lat: 51.515332, lng: -0.122399, zoom: 15},
	{lat: 48.861715, lng: 2.336221, zoom: 15},
	{lat: 52.367915, lng: 4.900242, zoom: 15},
	{lat: 4.735719, lng: -74.092686, zoom: 15},
	{lat: -34.586245, lng: -58.466545, zoom: 15},
	{lat: 47.099953, lng: -56.377437, zoom: 15},
	{lat: 44.182879, lng: 0.152701, zoom: 15},
	{lat: 46.043389, lng: 69.937854, zoom: 15},
	{lat: 41.821157, lng: 12.479361, zoom: 15}
];

var i = Math.trunc(Math.random() * loc.length);
var l = loc[i];
var geocoder = new google.maps.Geocoder();

function initialize() {
     var mapOptions = {
        center: { lat: l.lat, lng: l.lng},
			mapTypeId: google.maps.MapTypeId.TERRAIN,		
        zoom: 15,
		disableDefaultUI: true,
		scrollwheel: false,
		draggable: false,
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function validateCountry() {
	var c = document.getElementById("country").value.trim();
	var latlng = new google.maps.LatLng(l.lat, l.lng);	
	var addr;
	var country;
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
						if (results[0].formatted_address.indexOf(c)>-1
							|| country.indexOf(c)>-1) {
							alert('Congrats! This is '+country);
						}	
						else {
							alert('Sorry, this is '+country);
						}
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