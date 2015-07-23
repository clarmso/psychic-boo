// All latitude/longtitude of all locations.
// The answer of each question is determined by the Google
// reverse geocoding service, so there's no hacking in the
// Javascript code to get the answer. ;-)
var loc = [
	{lat:45.500169, lng: -73.565767, zoom: 15},
	{lat: 53.5378498, lng: -113.4819752, zoom: 15},
	{lat: 49.167993, lng: -123.938844, zoom: 15},
	{lat: 37.7577, lng: -122.4376, zoom: 15},
	{lat: 40.776608, lng: -111.920485, zoom: 15},
	{lat: 42.315522, lng: -71.071006, zoom: 15},
	{lat: 41.8718364, lng: -87.6301886, zoom: 15},
	{lat: 19.3907337, lng: -99.1436126, zoom: 15},
	{lat: 14.6117275, lng: -90.5371495, zoom: 16},
	{lat: -34.9107247, lng: -56.1712948, zoom: 16},
	{lat: -34.6056691, lng: -58.3696339, zoom: 16},
	{lat: 4.6482976, lng: -74.107807, zoom: 16},
	{lat: 10.4682651, lng: -66.8818686, zoom: 15},
	{lat: 23.1303107, lng: -82.3555189, zoom: 16},
	{lat: 18.4374906, lng: -69.9553341, zoom: 16},
	{lat: 51.5019619, lng: -0.0176133, zoom: 16},
	{lat: 51.5084797, lng: -0.1107611, zoom: 16},
	{lat: 48.854947, lng: 2.348606, zoom: 16},
	{lat: 48.827775, lng: 2.386844, zoom: 16},
	{lat: 50.6274877, lng: 3.0609577, zoom: 16},
	{lat: 43.6007, lng: 1.432841, zoom: 16},
	{lat: 38.7103644, lng: -9.1365144, zoom: 16},
	{lat: 46.2050295, lng: 6.1440885, zoom: 16},
	{lat: 46.9482251, lng: 7.4512394, zoom: 16},
	{lat: 47.0508076, lng: 8.3063376, zoom: 17},
	{lat: 53.0713858, lng: 8.8056544, zoom: 16},
	{lat: 53.5565774, lng: 9.9953496, zoom: 16},
	{lat: 50.1207167, lng: 8.6630855, zoom: 16},
	{lat: 48.2266176, lng: 16.4048435, zoom: 16},
	{lat: 41.9030897, lng: 12.4524904, zoom: 17},
	{lat: 41.3748912, lng: 2.1787657, zoom: 16},
	{lat: 41.8909407, lng: 12.4726472, zoom: 17},
	{lat: 44.4255271, lng: 26.1028893, zoom: 17},
	{lat: 52.225315, lng: 21.0455299, zoom: 16},
	{lat: 53.9072295, lng: 27.5551486, zoom: 16},
	{lat: 55.745028, lng: 37.641378, zoom: 16},
	{lat: 30.0456701, lng: 31.2293248, zoom: 16},
	{lat:36.8067726, lng: 10.1798415, zoom: 16},
	{lat: 33.5912986, lng: -7.6155516, zoom: 16},
	{lat: -26.2037546, lng: 28.0459898, zoom: 16},
	{lat: 41.013628, lng: 29.0163637, zoom: 16},
	{lat: 35.6994628, lng: 51.3418793, zoom: 17},
	{lat: 22.3576782, lng: 114.1210175, zoom: 16},
	{lat: 22.1892106, lng: 113.5505443, zoom: 16},
	{lat: 1.3049593, lng: 103.8585892, zoom: 17},
	{lat: -43.5053654, lng: 172.7074451, zoom: 16},
	{lat: -33.8605809, lng: 151.2112077, zoom: 17},
	{lat: -41.2929963, lng: 174.7830762, zoom: 16},
	{lat: 35.6827261, lng: 139.7605716, zoom: 16},
	{lat: 43.069364, lng: 141.355098, zoom: 16},
	{lat: 31.2201101, lng: 121.4933181, zoom: 16},
	{lat: 37.5651, lng: 126.98955, zoom: 16},
	{lat: 14.5980716, lng: 120.9796513, zoom: 17},
	{lat: 47.9160682, lng: 106.9052617, zoom: 17},
	{lat: 38.9152736, lng: 121.6090715, zoom: 17},
	{lat: 35.8332757, lng: 127.1262989, zoom: 17},
	{lat: 3.1355534, lng: 101.6935288, zoom: 17},
	{lat: -6.1412583, lng: 106.812266, zoom: 17},
	{lat: 25.0509905, lng: 121.542395, zoom: 17},
	{lat: 56.3368248, lng: -2.7898692, zoom: 16}
];

var listOfCountries = [
	"Argentina", "Australia", "Belarus", "Canada", "China",
	"Colombia", "France", "Germany", "Italy", "Japan", "Mexico",
	"New Zealand", "Portugal", "Romania", "Russia", "South Africa",
	"Sout Korea", "Spain", "Switzerland", "Turkey", "Vatican City",
	"United States", "United Kingdom", "Tunisia", "Iran", "Vietnam",
	"Tanzania", "Ghana", "Brazil", "Chile"
];


var noMeme = [
	"http://i.imgur.com/ub9gzny.png",
	"http://i.imgur.com/KXD0v4f.png",
	"http://i.imgur.com/zaiJFhJ.png",
	"http://i.imgur.com/KIq48Yn.png",
	"http://i.imgur.com/g9VDEiD.png",
	"http://i.imgur.com/Cjl7vmq.png",
	"http://i.imgur.com/42EDNHc.png",
	"http://i.imgur.com/puFO9JC.png",
	"http://i.imgur.com/E8ddrhz.png",
	"http://i.imgur.com/fhikE2b.png",
	"http://i.imgur.com/dUZpLeh.png",
	"http://i.imgur.com/hdaQBag.png",
	"http://i.imgur.com/oshvvKg.png",
	"http://i.imgur.com/7VmjZVW.png"
];

var yesMeme = [
	"http://i.imgur.com/hAp4rFM.png",
	"http://i.imgur.com/tTKWnnJ.png",
	"http://i.imgur.com/2eRZAhq.png",
	"http://i.imgur.com/mCp7GLQ.png",
	"http://i.imgur.com/Zeo81mi.png",
	"http://i.imgur.com/kNjFWUX.png",
	"http://i.imgur.com/rZPqX6i.png",
	"http://i.imgur.com/XY68Ubl.png",
	"http://i.imgur.com/WBzR0Mv.png"
];

var score = 0;

var l;
var geocoder = new google.maps.Geocoder();

function initialize() {

	var i = Math.trunc(Math.random() * loc.length);
	l = loc[i];
  var mapOptions = {
        center: { lat: l.lat, lng: l.lng},
				mapTypeId: google.maps.MapTypeId.ROAD,
        zoom: l.zoom,
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

    // Update the score
	$("#score").text("Score: "+score);

	// Refresh the input field
	$("#enter").attr("class", "btn btn-primary disabled");
	$("#enter").prop("disabled", true);


	$("#country").autocomplete({source: listOfCountries});
	$("#country").on('input', function() {
		$("#enter").attr("class", "btn btn-primary");
		$("#enter").prop("disabled", false);
	});

}

function validateCountry() {
	var country = $("#country").val().trim();
	$("#country").val("");

	if (country==null || country=="") {
		alert("Please enter the name of the country.");
		return false;
	}

	var latlng = new google.maps.LatLng(l.lat, l.lng);
	var addr;
	var longCountry;
	var shortCountry;
	var random;
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

					for (i=0; i<addr.length; i++) {
						if (addr[i].types.indexOf("country")>-1) {
							longCountry = addr[i].long_name;
							shortCountry = addr[i].short_name;
						}
					}

					if (longCountry.indexOf(country)>-1  || shortCountry.indexOf(country)>-1) {
						$("#answer").text("Congrats! This is in "+longCountry+".");
						$("#answer-div").addClass("alert alert-sucess");
						random = Math.trunc(Math.random() * yesMeme.length);
						$("#meme").attr("src", yesMeme[random]);
						score = score + 1;
					}
					else {
						$("#answer").text("Sorry! This is in "+longCountry+".");
						$("#answer-div").addClass("alert alert-danger");
						random = Math.trunc(Math.random() * noMeme.length);
						$("#meme").attr("src",noMeme[random]);
					}
					$('#myModal').on('hidden.bs.modal', function () {
    					initialize();
					})
					$('#myModal').on('shown.bs.modal', function() {
						$('#nextQuestion').keyup(function(event) {
							if (event.keyCode==13) {
								$('#myModal').modal('hide');
							}
							if (event.keyCode==32) {
								$('#myModal').modal('hide');
							}
						})
					})
					$('#myModal').modal('show');



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
