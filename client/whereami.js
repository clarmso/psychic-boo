var geocoder = new google.maps.Geocoder();

var Greetings = React.createClass({displayName: "Greetings",

  getInitialState: function() {
    console.log("REACT: getInitialState");
    return {
      enable: false,
      btnclass: "btn btn-primary disabled",
      userInput: "",
      score: 0,
      loc: origloc.slice(),
      latlng: origloc[0],
      answerColour: "alert alert-success",
      answerMesg: "Congrats!",
      memeImg: yesMeme[0],
      numQuestions: 0,
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
                 value: this.state.userInput}), " ", 
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
          className: "modal fade", role: "dialog", tabIndex: "-1", 
          onKeyUp: this.closeModalDiv}, 
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
                  React.createElement("p", {className: this.state.answerColour}, this.state.answerMesg), 
                  React.createElement("p", {className: "link"}, 
                    React.createElement("a", {
                      href: 'https://www.google.ca/maps?z='
                        +this.state.latlng.zoom+'&q=loc:'
                        +this.state.latlng.lat+'+'
                        +this.state.latlng.lng, target: "_blank"}, "Map")
                  )
                )
              ), 
              React.createElement("div", {className: "modal-footer"}, 
                React.createElement("button", {id: "nextQuestion", ref: "nextQuestion", 
                  type: "button", 
                  className: "btn btn-primary", "data-dismiss": "modal", 
                  onClick: this.closeModal}, "Next Question")
              )
            )
          )
        ), 
        React.createElement("div", {id: "finalResModal", ref: "finalResModal", 
          className: "modal fade", role: "dialog", tabIndex: "-1", 
          onKeyUp: this.closeResModalDiv}, 
          React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("div", {className: "modal-content"}, 
              React.createElement("div", {className: "modal-header"}, 
                React.createElement("button", {type: "button", className: "close", 
                  onClick: this.closeResModal, "aria-hidden": "true"}, "×"), 
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
                React.createElement("button", {id: "newGame", ref: "newGame", 
                  type: "button", 
                  className: "btn btn-primary", "data-dismiss": "modal", 
                  onClick: this.closeResModal}, "New Game")
              )
            )
          )
        )
      )
    )
  },

  componentDidMount: function() {
    console.log("REACT: componentDidMount");

    // Add GoogleMap
    const spinner = new Spinner({});
    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROAD,
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
    const map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    google.maps.event.addListener(map, 'tilesloaded',
      function() {
        spinner.stop();
      }
    );

    // What to do when the next question is presented?
    me = this;
    var getNextMap = function() {
      var i = Math.trunc(Math.random() * me.state.loc.length);
      var l = me.state.loc[i];
      me.state.loc.splice(i, 1);
      me.setState({ latlng: l });
      spinner.spin(document.getElementById('container'));
      map.setCenter({lat: l.lat, lng: l.lng});
      map.setZoom(l.zoom);
      console.log("loc length: "+me.state.loc.length+" i = "+i);
    };

    // Define all listeners for modal:
    // What to do when the modals are closed/opened?
    $(React.findDOMNode(this.refs.country))
      .autocomplete({
        source: listOfCountries,
        minLength: 1,
        select: function(event, ui) {
          me.setState({ userInput: this.value });
        }
      });
    $(React.findDOMNode(me.refs.myModal)).on('shown.bs.modal', function(){
      $(React.findDOMNode(me.refs.myModal)).focus();
    });
    $(React.findDOMNode(me.refs.myModal)).on('hidden.bs.modal', function(){
      console.log("REACT: questions answered = "+me.state.numQuestions);
      // When the modal is closed by clicking the grey overlay,
      // the field need to be focused when the modal is closed
      // completely, not at the time when closeModal is called.
      $(React.findDOMNode(me.refs.country)).focus();
      if (me.state.numQuestions < 10) {
        getNextMap();
      } else {
        // Game over!
        var img;
        if (me.state.score>5) {
          random = Math.trunc(Math.random() * yesMeme.length);
          img = yesMeme[random];
        }	else {
          random = Math.trunc(Math.random() * noMeme.length);
          img = noMeme[random];
        }
        me.setState({
          answerMesg: "Your final score: "+me.state.score+"/10",
          answerColour: "alert alert-info", memeImg: img
        });
        $(React.findDOMNode(me.refs.finalResModal)).modal('show');
      }
    });
    $(React.findDOMNode(me.refs.finalResModal)).on('hidden.bs.modal', function(){
      $(React.findDOMNode(me.refs.country)).focus();
      getNextMap();
    });

    if (!docCookies.getItem('hasShownIntro')) {
      //console.log("First time. Show intro.");
      introJs()
        .setOption('showProgress', true)
        .setOption('showBullets', false)
        .setOption('showStepNumbers', false)
        .setOption('skipLabel', "Skip intro")
        .setOption('doneLabel', "<b>Start Game!</b>")
        .onexit(function() {
          docCookies.setItem('hasShownIntro', true);
        })
        .setOptions({ steps: [
          { intro: "Welcome! Let me show you how to play this game." },
          { element: '#map-canvas', intro: "Study at the map carefully.", position: 'bottom-middle-aligned' },
          { element: '#country', intro: "Type your answer here.", position: 'right' },
          { element: '#enter', intro: "Click 'Enter'", position: 'bottom-middle-aligned' },
          { element: '#score', intro: "Your wonderful score! ☺", position: 'left' }
        ] })
      .start();
    } else {
      //console.log("Have shown intro before!!");
    }

    // Load the map for the first question
    getNextMap();
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
                      memeImg: yesMeme[random],
                      numQuestions: me.state.numQuestions+1 });
                  }
                  else {
                    random = Math.trunc(Math.random() * noMeme.length);
                    me.setState({
                      answerColour: "alert alert-danger",
                      answerMesg: "Sorry! This is in "+longCountry+". 💩",
                      memeImg: noMeme[random],
                      numQuestions: me.state.numQuestions+1 });

                    console.log("REACT: Wrong answer. Got "+input+". Correct answer is "+longCountry);
                  }
          			}
          	}
            console.log("REACT: show modal");
            $(React.findDOMNode(me.refs.myModal)).modal('show');
            me.setState({ userInput: ""});

        } else {
          alert("Google Geocoder API is not available.");
        }
      }
    );
  },

  handleEnter: function(event) {
    if (event.keyCode==13) {
      this.handleClick();
    }
  },

  closeModalDiv: function(event) {
    if ( (event.keyCode==13) || (event.keyCode==32) ){
      this.closeModal(event);
    }
  },
  closeModal: function(event) {
    $(React.findDOMNode(this.refs.myModal)).modal('hide');
  },

  closeResModalDiv: function(event) {
    if ( (event.keyCode==13) || (event.keyCode==32) ){
      this.closeResModal(event);
    }
  },
  closeResModal: function(event) {
    console.log("REACT: closeResModal");
    $(React.findDOMNode(this.refs.finalResModal)).modal('hide');
    this.setState({ userInput: "", score: 0, loc: origloc.slice(), numQuestions: 0 });
  },

});

React.render(
  React.createElement(Greetings, null),
  document.getElementById('react-enter')
);
