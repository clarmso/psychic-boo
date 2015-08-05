var score = 0;

var l;
var geocoder = new google.maps.Geocoder();
var numQuestions = 10;

function initialize() {
	var spinner = new Spinner({}).spin(document.getElementById('spin'));
	numQuestions--;

	// Game Over!
	if (numQuestions==0) {
		$(".answer").text("Your final score: "+score+"/10");
		$("#answer-div").removeClass("alert alert-danger")
			.removeClass("alert alert-success")
			.addClass("alert alert-info");

		if (score>5) {
			random = Math.trunc(Math.random() * yesMeme.length);
			$("#meme").attr("src", yesMeme[random]);
		}	else {
			random = Math.trunc(Math.random() * noMeme.length);
			$("#meme").attr("src",noMeme[random]);
		}
		$("#nextQuestion").text("New Game");
		console.log("show final score");
		$('#myModal').modal('show');

	// More questions
	} else {

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
			loc.splice(i,1);
  		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			google.maps.event.addListenerOnce(map, 'tilesloaded',
				function() {
					spinner.stop();
				}
			);

			// Update the score
			$(".score").text("Score: "+score);

			// Refresh the input field
			$("#enter").attr("class", "btn btn-primary disabled");
			$("#enter").prop("disabled", true);
			$("#country").val("");
			$("#country").focus();
		}
}

function validateCountry() {
	var country = $("#country").val().trim();

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
						$(".answer").text("Congrats! This is in "+longCountry+".");
						$("#answer-div").removeClass("alert alert-danger").addClass("alert alert-success");
						random = Math.trunc(Math.random() * yesMeme.length);
						$("#meme").attr("src", yesMeme[random]);
						score = score + 1;
					}
					else {
						$(".answer").text("Sorry! This is in "+longCountry+".");
						$("#answer-div").removeClass("alert alert-success").addClass("alert alert-danger");
						random = Math.trunc(Math.random() * noMeme.length);
						$("#meme").attr("src",noMeme[random]);
					}
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

$(document).ready(function() {

	$('#myModal').on('hidden.bs.modal', function () {
			//console.log('hide modal');
			$("#nextQuestion").text("Next Question");
			if (numQuestions==0) {
				location.reload();
			} else {
				initialize();
			}
	});

	$('#myModal').keyup(function(event) {
		//console.log('close modal by enter or space bar');
		if ( (event.keyCode==13) || (event.keyCode==32) ){
			$('#myModal').modal('hide');
		}
	});

	$("#country").autocomplete({source: listOfCountries});
	$("#country").on('input', function() {
		$("#enter").removeClass("disabled").attr("class", "btn btn-primary").removeProp("disabled");
	});
	$("#country").keyup(function(event) {
		//console.log('country entered');
		if ( (event.keyCode==13) && ($("#country").val().trim()!="") ){
			validateCountry();
		}
	})

});

google.maps.event.addDomListener(window, 'load', initialize)
