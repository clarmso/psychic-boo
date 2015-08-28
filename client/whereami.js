var spinner = new Spinner({});

Greetings = React.createClass({displayName: "Greetings",

  getInitialState: function() {
    return {
      enable: false,
      btnclass: "btn btn-primary disabled",
      userInput: "",
      score: 0,
      latlng: null,
      loaded: false
    };
  },
  render: function() {
    console.log("render Greetings");
    return (
        React.createElement("div", {id: "container"}, 
          React.createElement("h1", null, "WHERE AM I?"), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-xs-8"}, 
              React.createElement("input", {
                id: "country", ref: "country", 
                placeholder: "Country Name", 
                onChange: this.handleChange, 
                onKeyUp: this.handleEnter, 
                value: this.state.userInput, 
                autoFocus: true}), 
              React.createElement("button", {
                id: "enter", 
                className: this.state.btnclass, 
                disabled: !this.state.enable, 
                onClick: this.handleClick}, "Enter")
            ), 
            React.createElement("div", {className: "col-xs-4"}, 
              React.createElement("p", {id: "score"}, "Score: ", this.state.score, "/10")
            )
          ), 
          React.createElement("div", {id: "map-canvas"})
        )
    )
  },
  componentDidMount: function() {
    console.log("component did mount");
    // TODO: Need npm install react-spin
    spinner.spin(document.getElementById('container'));
    //var i = Math.trunc(Math.random() * loc.length);
    //l = loc[i];
    l = {lat:45.500169, lng: -73.565767, zoom: 15}; // just one place for now
    var mapOptions = {
        center: { lat: l.lat, lng: l.lng},
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
      //loc.splice(i,1);
      // TODO: Google Maps for react
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      google.maps.event.addListenerOnce(map, 'tilesloaded',
        function() {
          spinner.stop();
        }
      );
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
    //$(React.findDOMNode(this.refs.country)).focus();// after closing modal
    //console.log("focus?");
    //this.setState({ score: this.state.score+1 });  // don't check for correct answer for now
    //console.log("enable: "+this.state.enable+"  btnclass: "+this.state.btnclass);
  },
  handleClick: function(event) {
    //validateCountry(this.state.userInput);
    var input = this.state.userInput;
    var latlng = this.state.latlng;
    console.log("handleClick: userInput = "+input);
    console.log("handleClick: userInput = "+event.target.value);
    geocoder.geocode({
  		'latLng': latlng,
  		'language': "en",
  		},
  		function(results, status) {
  			if (status == google.maps.GeocoderStatus.OK) {
  				if (results[0]) {
              var addr = results[0].address_components;
              // Check address
              for (i=0; i<addr.length; i++) {
                if (addr[i].types.indexOf("country")>-1) {
                  console.log(addr[i].long_name);
                  if ( (input.toUpperCase() == addr[i].long_name)
                      || (input.toUpperCase() == addr[i].short_name) ) {
                        console.log("Correct answer :D");
                        Greetings.state.score = Greetings.state.score+1;
                        return null;

                    }
                }
              }
            }
          }
          console.log("Wrong answer");
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
  React.createElement(Greetings, null),
  document.getElementById('react-enter')
);
