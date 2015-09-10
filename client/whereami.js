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

var Greetings = React.createClass({displayName: "Greetings",

  getInitialState: function() {
    console.log("REACT: getInitialState");
    return {
      enable: false,
      btnclass: "btn btn-primary disabled",
      userInput: "",
      score: 0,
      latlng: null,
      showModal: false,
      answerColour: "alert alert-success",
      answerMesg: "Congrats!",
      memeImg: yesMeme[0],
    };
  },

  render: function() {
    console.log("REACT: render");
    return (
      React.createElement("div", null, 
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
                bsStyle: "danger", 
                className: this.state.btnclass, 
                disabled: !this.state.enable, 
                onClick: this.handleClick}, "Enter")
            ), 
            React.createElement("div", {className: "col-xs-4"}, 
              React.createElement("p", {id: "score"}, "Score: ", this.state.score, "/10")
            )
          ), 
          React.createElement("div", {id: "map-canvas"})
        ), 
        React.createElement("div", {id: "myModal", ref: "myModal", 
          className: "modal fade", role: "dialog", tabindex: "-1"}, 
          React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("div", {className: "modal-content"}, 
              React.createElement("div", {className: "modal-header"}, 
                React.createElement("button", {type: "button", className: "close", 
                  onClick: this.closeModal, "aria-hidden": "true"}, "×"), 
                React.createElement("h4", null)
              ), 
              React.createElement("div", {className: "modal-body"}, 
                React.createElement("div", {className: "meme"}, 
                  React.createElement("img", {id: "meme", src: this.state.memeImg})
                ), 
                React.createElement("div", {id: "answer-div"}, 
                  React.createElement("p", {className: this.state.answerColour}, this.state.answerMesg)
                )
              ), 
              React.createElement("div", {className: "modal-footer"}, 
                React.createElement("button", {id: "nextQuestion", ref: "nextQuestion", 
                  type: "button", 
                  className: "btn btn-primary", "data-dismiss": "modal", 
                  autoFocus: true, 
                  onClick: this.closeModal}, "Next Question")
              )
            )
          )
        )
      )
    )
  },

  componentDidMount: function() {
    console.log("REACT: componentDidMount");
    var i = Math.trunc(Math.random() * loc.length);
    me = this;
  	l = loc[i];
    this.setState({latlng: l});
    refreshMap(l);
    loc.splice(i, 1);
    $(React.findDOMNode(this.refs.country))
      .autocomplete({
        source: listOfCountries,
        minLength: 1 ,
        select: function(event, ui) {
          me.setState({ userInput: this.value });
        }
      })
  },

  componentWillUnmount: function() {
    console.log("REACT: componentWillUnmount");
    $(React.findDOMNode(this.refs.country)).autocomplete('destroy');
  },

  handleChange: function(event) {
    //console.log("REACT: handleChange");
    this.state.userInput = event.target.value;
    if (event.target.value.length > 0) {
      this.setState({ enable: true, btnclass: "btn btn-primary"})
    } else {
      this.setState({ enable: false, btnclass: "btn btn-primary disabled"});
    }
  },

  handleClick: function(event) {
    console.log("REACT: handleClick");
    var input = this.state.userInput.toUpperCase();
    var latlng = this.state.latlng;
    var me = this;

    geocoder.geocode({
  		'latLng': new google.maps.LatLng(latlng.lat, latlng.lng),
  		'language': "en"
  		},
      function(result, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("REACT: Geocoder Status OK");
          	var addr = result[0].address_components;
          	var longCountry = "";
            var random;

          	for (i=0; i<addr.length; i++) {
          			if (addr[i].types.indexOf("country")>-1) {
          				longCountry = addr[i].long_name;
                  if ( input === longCountry.toUpperCase() ) {
                    random = Math.trunc(Math.random() * yesMeme.length);
                    me.setState({
                      score: me.state.score+1,
                      answerColour: "alert alert-success",
                      answerMesg: "Congrats! This is in "+longCountry+". 😊",
                      memeImg: yesMeme[random] });
                  }
                  else {
                    random = Math.trunc(Math.random() * noMeme.length);
                    me.setState({
                      answerColour: "alert alert-danger",
                      answerMesg: "Sorry! This is in "+longCountry+". 💩",
                      memeImg: noMeme[random] });

                    console.log("REACT: Wrong answer. Got "+input+". Correct answer is "+longCountry);
                  }
          			}
          	}
            console.log("REACT: show modal");
            $(React.findDOMNode(me.refs.myModal)).modal('show');
            me.setState({ showModal: true });
            console.log("REACT: focus on country field?");
            $(React.findDOMNode(me.refs.country)).focus();

        } else {
          alert("Google Geocoder API is not available.");
        }
      }
    );
    this.setState({ enable: false, btnclass: "btn btn-primary disabled" });
  },

  handleEnter: function(event) {

    if (event.keyCode==13) {
      if (this.state.showModal) {
        console.log("REACT: Pressed Enter and modal opened");
        this.closeModal(event);
        console.log("REACT: done closeModal (1)");
      } else if (this.state.enable) {
        console.log("REACT: Pressed Enter after entering an anser");
        this.handleClick();
        console.log("REACT: done handleClick");
      }
    }
    else if ((event.keyCode==32) && (this.state.showModal)) {
      console.log("REACT: Pressed space bar to close modal");
      this.closeModal(event);
      console.log("REACT: done closeModal (1)");
    }
    $(React.findDOMNode(this.refs.country)).focus();
  },
  closeModal: function(event) {
    console.log("REACT: closeModal");
    $(React.findDOMNode(this.refs.myModal)).modal('hide');
    var i = Math.trunc(Math.random() * loc.length);
    var l = loc[i];
    this.setState({latlng: l});
    refreshMap(l);
    loc.splice(i, 1);
    this.setState({showModal: false, userInput: ""});

    $(React.findDOMNode(this.refs.country)).focus();

    }
});



React.render(
  React.createElement(Greetings, null),
  document.getElementById('react-enter')
);
