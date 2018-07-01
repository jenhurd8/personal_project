import React from "react";
import "./Provider.css";
import { Component } from "react";
import Nav from "../../component/Nav/Nav.js";
import { Link } from "react-router-dom";

class Provider extends Component {
  state = {
    provider: ""
  };

  render() {
    return (
      <div className="provider">
        <Nav />
        <div className="inputs">
          Add a doctor or health care provider here:
          <br />
          <br />
          Provider Name:
          <input
            placeholder="Provider Name"
            type="text"
            onChange={this.state.provider}
          />
          <button>Provider Search</button>
          <br />
          <button>Confirm Provider</button>
        </div>
        <Link to="/dashboard">
          <button>Cancel</button>
        </Link>
      </div>
    );
  }
}

export default Provider;
