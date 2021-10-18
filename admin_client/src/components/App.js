import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchuser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>Hi</div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchuser: () => dispatch(actions.fetchUser()),
  };
}

export default connect(null, mapDispatchToProps)(App);
