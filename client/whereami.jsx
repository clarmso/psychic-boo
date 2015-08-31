var spinner = new Spinner({});
var geocoder = new google.maps.Geocoder();

function refreshMap(l) {
  spinner.spin(document.getElementById('container'));
  var mapOptions = {
    center: { lat: l.lat, lng: l.lng },
    mapTypeId: google.maps.MapTypeId.ROAD,
    zoom: l.zoom,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    draggable: false,
    scrollwheel: false,
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
  google.maps.event.addListenerOnce(map, 'tilesloaded',
    function() {
      spinner.stop();
    }
  );
}

Greetings = React.createClass({

  getInitialState: function() {
    return {
      enable: false,
      btnclass: "btn btn-primary disabled",
      userInput: "",
      score: 0,
      latlng: null,
    };
  },
  render: function() {
    console.log("render Greetings");
    return (
        <div id="container">
          <h1>WHERE AM I?</h1>
          <div className="row">
            <div className="col-xs-8">
              <input
                id="country" ref="country"
                placeholder="Country Name"
                onChange={this.handleChange}
                onKeyUp={this.handleEnter}
                value={this.state.userInput}
                autoFocus/>
              <button
                id="enter"
                className={this.state.btnclass}
                disabled={!this.state.enable}
                onClick={this.handleClick}>Enter</button>
            </div>
            <div className="col-xs-4">
              <p id="score">Score: {this.state.score}/10</p>
            </div>
          </div>
          <div id="map-canvas"></div>
        </div>
    )
  },
  componentDidMount: function() {
    console.log("component did mount");
    // TODO: Need npm install react-spin
    var i = Math.trunc(Math.random() * loc.length);
  	l = loc[i];
    this.setState({latlng: l});
    refreshMap(l);
    loc.splice(i, 1);
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

  },
  handleClick: function(event) {
    var input = this.state.userInput.toUpperCase();
    var latlng = this.state.latlng;
    var me = this;

    geocoder.geocode({
  		'latLng': new google.maps.LatLng(latlng.lat, latlng.lng),
  		'language': "en"
  		},
      function(result, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("Geocoder Status OK");
          	var addr = result[0].address_components;
          	var longCountry = "";

          	for (i=0; i<addr.length; i++) {
          			if (addr[i].types.indexOf("country")>-1) {
          				longCountry = addr[i].long_name.toUpperCase();
                  if ( input === longCountry ) {
                      me.setState({ score: me.state.score+1 });
                    }
                  else {
                    console.log("Wrong answer. Correct answer is "+longCountry);
                  }
          			}
          	}
            // Set modal messages
            var i = Math.trunc(Math.random() * loc.length);
            var l = loc[i];
            me.setState({latlng: l});
            refreshMap(l);
            loc.splice(i, 1);

            $(React.findDOMNode(me.refs.country)).focus();// after closing modal
            

        } else {
          alert("Google Geocoder API is not available.");
        }
      }
    );
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
