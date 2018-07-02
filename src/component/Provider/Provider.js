import React from "react";
import "./Provider.css";
import { Component } from "react";
import Nav from "../../component/Nav/Nav.js";
import { Link } from "react-router-dom";
import axios from "axios";

class Provider extends Component {
  constructor() {
    super();
    this.state = {
      providers: []
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onSearchHandler() {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Nadera%20Sweiss&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${
          process.env.REACT_APP_api_key
        }`
      )
      .then(response => {
        this.setState({
          providers: response.data
        });
        console.log(response.data);
      });
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
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
            name="provider"
            placeholder="Enter Provider's First and Last Name (ex: John Jones)"
            type="text"
            onChange={this.onChangeHandler}
          />
          <br />
          <button onClick={() => this.onSearchHandler()}>
            {/* this.state.provider add back to onSearchHandler after test */}
            Click to Search for Provider
          </button>
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
