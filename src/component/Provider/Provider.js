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
      suffix: "",
      value: "",
      providerSearchName: "",
      providers: [],
      responseName: "",
      responseAddress: ""
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.searchAgain = this.searchAgain.bind(this);
    this.confirmedProvider = this.confirmedProvider.bind(this);
  }

  onSearchHandler() {
    let completeSearchString = `${this.state.providerSearchName} ${
      this.state.suffix
    } ${this.state.value}`;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${completeSearchString}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${
          process.env.REACT_APP_api_key
        }`
      )
      .then(response => {
        if (response.data.status !== "ZERO_RESULTS") {
          this.setState({
            providers: response.data,
            responseName: response.data.candidates[0].name,
            responseAddress: response.data.candidates[0].formatted_address
          });
        } else {
          this.setState({
            providers: response.data,
            responseName: "No Providers Found"
          });
        }
        // console.log(this.state.providers);
        // console.log(this.state.providers.candidates[0].name);
        // console.log(this.state.providers.candidates[0].formatted_address);
      });
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchAgain() {
    this.setState({
      suffix: "",
      value: "",
      providerSearchName: ""
    });
  }
  confirmedProvider() {}

  render() {
    return (
      <div className="provider">
        <Nav />
        <div className="inputs">
          Add a doctor or health care provider here:
          <br />
          Provide all three inputs for more accurate results.
          <br />
          <br />
          Provider Name:
          <input
            name="providerSearchName"
            placeholder="Provider's First Last (ex: John Jones)"
            type="text"
            onChange={this.onChangeHandler}
          />
          <br />
          Provider Category:
          <select name="suffix" onChange={this.onChangeHandler}>
            <option value="">Select Provider Type</option>
            <option value="MD">Doctor</option>
            <option value="PA">Physician Assistant</option>
            <option value="Hospital">Hospital</option>
            <option value="Urgent Care">Urgent Care</option>
          </select>
          <br />
          Provider Location:
          <select name="value" onChange={this.onChangeHandler}>
            <option value="">Select Provider State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <br />
          <button
            onClick={() => this.onSearchHandler(this.state.providerSearchName)}
          >
            Click to Search for Provider
          </button>
          <br />
          <p>{this.state.responseName}</p>
          <p>{this.state.responseAddress}</p>
          <br />
          <button onClick={() => this.confirmedProvider}>
            Confirm Provider
          </button>
          <button onClick={() => this.searchAgain}>Search Again</button>
        </div>
        <Link to="/dashboard">
          <button>Cancel</button>
        </Link>
      </div>
    );
  }
}

export default Provider;
