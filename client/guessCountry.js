var score = 0;

var l;
var geocoder = new google.maps.Geocoder();
var numQuestions = 10;
var loc = origloc;
var spinner = new Spinner({});
var Greetings;

function initialize() {

	numQuestions--;

	// Game Over!
	if (numQuestions==0) {

		// REACT.js #2
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
		//console.log("show final score");
		$('#myModal').modal('show');

	// More questions
	} else {
		spinner.spin(document.getElementById('spin'));
		var i = Math.trunc(Math.random() * loc.length);
		l = loc[i];
  	var mapOptions = {
        center: { lat: l.lat, lng: l.lng},
				mapTypeId: google.maps.MapTypeId.ROAD,
        zoom: l.zoom,
				disableDefaultUI: true,
				draggable: false,
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
			$("#score").text("Score: "+score+"/10");

			// Refresh the input field
			//$("#country").focus();
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

	Greetings = React.createClass({
		getInitialState: function() {

			return {
				enable: false,
				btnclass: "btn btn-primary disabled",
				userInput: ""
			};
		},
		render: function() {
			//console.log("render Greetings");
			return (
				<div className="col-xs-8">
					<input
						id="country"
						ref="country"
						placeholder="Country Name"
						onChange={this.handleChange}
						onKeyUp={this.handleEnter}
						value={this.state.userInput}
						autoFocus
						data-step="3"
						data-intro="Type your answer here."
						data-position="right"/>
					<button
						id="enter"
						className={this.state.btnclass}
						disabled={!this.state.enable}
						onClick={this.handleClick}
						data-step="4"
						data-intro="Click 'Enter'"
						data-position="bottom-middle-aligned">Enter</button>
				</div>
			)
		},
		componentDidMount: function() {
			console.log("component will mount");
			$(React.findDOMNode(this.refs.country)).autocomplete({source: listOfCountries});
		},
		componentWillUnmount: function() {
			console.log("component will unmount");
		},
		handleChange: function(event) {
			//console.log(event.target.value);
			this.state.userInput = event.target.value;
			if (event.target.value.length > 0) {
				this.setState({ enable: true, btnclass: "btn btn-primary"})
			} else {
				this.setState({ enable: false, btnclass: "btn btn-primary disabled"});
			}
			//console.log("enable: "+this.state.enable+"  btnclass: "+this.state.btnclass);
		},
		handleClick: function(event) {
			validateCountry();
			this.setState({ userInput: "", enable: false, btnclass: "btn btn-primary disabled" });
		},
		handleEnter: function(event) {
			if ( (event.keyCode==13) && this.state.enable ) {
				this.handleClick();
			}
		}
	});

	React.render(
		<Greetings/>,
		document.getElementById('react-enter')
	);
	// NOTE: autocomplete must be called *after* rendering $("#country")
	// by React.js.
	//$("#country").autocomplete({source: listOfCountries});

	$('#myModal').on('hidden.bs.modal', function () {
			//console.log('hide modal');
			$("#nextQuestion").text("Next Question");
			if (numQuestions==0) {
				loc = origloc;
				numQuestions = 10;
			}
			initialize();
	});

	$('#myModal').keyup(function(event) {
		//console.log('close modal by enter or space bar');
		if ( (event.keyCode==13) || (event.keyCode==32) ){
			$('#myModal').modal('hide');
		}
	});



	if (!docCookies.getItem('hasShownIntro')) {
		//console.log("First time. Show intro.");
		introJs()
			.setOption('showProgress', true)
			//.setOption('tooltipPosition', 'bottom-middle-aligned')
			.setOption('showBullets', false)
			.setOption('showStepNumbers', false)
			.setOption('skipLabel', "Skip intro")
			.setOption('doneLabel', "<b>Start Game!</b>")
			.onexit(function() {
				docCookies.setItem('hasShownIntro', true);
			})
			.start();
	} else {
		//console.log("Have shown intro before!!");
	}


});

google.maps.event.addDomListener(window, 'load', initialize);
