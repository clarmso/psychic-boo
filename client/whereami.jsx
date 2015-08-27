Greetings = React.createClass({
  getInitialState: function() {

    return {
      enable: false,
      btnclass: "btn btn-primary disabled",
      userInput: ""
    };
  },
  render: function() {
    console.log("render Greetings");
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
    console.log("component did mount");
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
    validateCountry(this.state.userInput);
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
