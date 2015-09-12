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

var Greetings = React.createClass({

  getInitialState: function() {
    console.log("REACT: getInitialState");
    return {
      enable: false,
      btnclass: "btn btn-primary disabled",
      userInput: "",
      score: 0,
      latlng: loc[0],
      showModal: false,
      answerColour: "alert alert-success",
      answerMesg: "Congrats!",
      memeImg: yesMeme[0],
    };
  },

  render: function() {
    console.log("REACT: render");
    return (
      <div>
        <div id="container">
          <h1>WHERE AM I?</h1>
          <div className="row">
            <div className="col-xs-8">
              <input
                id="country" ref="country"
                placeholder="Country Name"
                onChange={this.handleChange}
                onKeyUp={this.handleEnter}
                value={this.state.userInput}/>
              <button
                id="enter"
                bsStyle="danger"
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
        <div id="myModal" ref="myModal"
          className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close"
                  onClick={this.closeModal} aria-hidden="true">&times;</button>
                <h4/>
              </div>
              <div className="modal-body">
                <div className="meme">
                  <img id="meme" src={this.state.memeImg}/>
                </div>
                <div id="answer-div">
                  <p className={this.state.answerColour}>{this.state.answerMesg}</p>
                  <p className="link">
                    <a
                      href={'https://www.google.ca/maps?z='
                        +this.state.latlng.zoom+'&q=loc:'
                        +this.state.latlng.lat+'+'
                        +this.state.latlng.lng} target="_blank">Map</a>
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button id="nextQuestion" ref="nextQuestion"
                  type="button"
                  className="btn btn-primary" data-dismiss="modal"
                  autoFocus
                  onClick={this.closeModal}>Next Question</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  componentDidMount: function() {
    console.log("REACT: componentDidMount");
    // Need to abstract the refresh map part (**)
    var i = Math.trunc(Math.random() * loc.length);
    l = loc[i];
    this.setState({latlng: l});
    refreshMap(l);
    loc.splice(i, 1);
    me = this;
    $(React.findDOMNode(this.refs.country))
      .autocomplete({
        source: listOfCountries,
        minLength: 1,
        select: function(event, ui) {
          me.setState({ userInput: this.value });
        }
      });
    $(React.findDOMNode(me.refs.myModal)).on('shown.bs.modal', function(){
      me.setState({showModal: true});
      console.log("showModal: true");
    });
    $(React.findDOMNode(me.refs.myModal)).on('hidden.bs.modal', function(){
      me.setState({showModal: false});
      // Get the next question (**)
      var i = Math.trunc(Math.random() * loc.length);
      var l = loc[i];
      me.setState({latlng: l});
      refreshMap(l);
      loc.splice(i, 1);
      console.log("showModal: false");
    });
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
    var input = this.state.userInput.toUpperCase().trim();
    var latlng = this.state.latlng;
    var me = this;
    this.setState({ enable: false, btnclass: "btn btn-primary disabled" });

    console.log(event.keyCode);

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
            console.log("REACT: focus on country field?");
            me.setState({ userInput: ""});
            $(React.findDOMNode(me.refs.country)).focus();

        } else {
          alert("Google Geocoder API is not available.");
        }
      }
    );

  },

  handleEnter: function(event) {

    if (event.keyCode==13) {
      if (this.state.showModal) {
        console.log("REACT: Pressed Enter and modal opened");
        this.closeModal(event);
        console.log("REACT: done closeModal (1)");
      } else if (this.state.enable) {
        console.log("REACT: Pressed Enter after entering an answer");
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
    console.log("This latlng: "+this.state.latlng.lat);
    $(React.findDOMNode(this.refs.myModal)).modal('hide');
    $(React.findDOMNode(this.refs.country)).focus();
    $(React.findDOMNode(this.refs.country)).value='';
    this.setState({ userInput: ""});
  },

});



React.render(
  <Greetings/>,
  document.getElementById('react-enter')
);
