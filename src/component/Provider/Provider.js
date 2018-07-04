import React, { Component } from "react";
import "./Provider.css";
import Nav from "../../component/Nav/Nav.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { removeProvider, addProvider, getProviders } from "../../redux/reducer";

class Provider extends Component {
  constructor() {
    super();
    this.state = {
      providerSearchName: "",
      suffix: "",
      value: "",
      responseName: "",
      responseAddress: "",
      responseId: "",
      responseReference: "",
      bdPhoto:
        "http://res.cloudinary.com/jjenjjenjjen/image/upload/c_scale,w_200/v1530567672/computer-desk-doctor-48604_exuiyj.jpg",
      bdPhone: null,
      bdPracticeName: ""
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.searchAgain = this.searchAgain.bind(this);
    this.confirmedProvider = this.confirmedProvider.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    this.props.getProviders();
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchAgain() {
    //forces page reload
    window.location.reload();
  }

  editHandler = e => {};

  deleteHandler(id) {
    this.props.removeProvider(id);
    this.searchAgain();
  }

  onSearchHandler() {
    let completeSearchString = `${this.state.providerSearchName} ${
      this.state.suffix
    } ${this.state.value}`;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${completeSearchString}&inputtype=textquery&fields=photos,id,icon,photos,plus_code,reference,formatted_address,name,rating,opening_hours,geometry&key=${
          process.env.REACT_APP_api_key
        }`
      )
      .then(response => {
        if (response.data.status !== "ZERO_RESULTS") {
          this.setState({
            //providers: response.data,
            responseName: response.data.candidates[0].name,
            responseAddress: response.data.candidates[0].formatted_address,
            responseId: response.data.candidates[0].id,
            responseReference: response.data.candidates[0].reference
          });
          // console.log(this.state.providers);
        } else {
          this.setState({
            //providers: response.data,
            responseName: "No Providers Found"
          });
        }
      });
    axios
      .get(
        `https://api.betterdoctor.com/2016-03-01/doctors?name=${
          this.state.providerSearchName
        }&location=${this.state.value}&skip=0&limit=10&user_key=${
          process.env.REACT_APP_api_key2
        }`
      )
      .then(response => {
        console.log(response);
        if (response.data.data.length !== 0) {
          this.setState({
            bdPhoto: response.data.data[0].profile.image_url,
            bdPhone: response.data.data[0].practices[0].phones[0].number,
            bdPracticeName: response.data.data[0].practices[0].name
          });
        } else {
          this.setState({
            responseName: this.state.providerSearchName
          });
        }
      });
  }

  confirmedProvider() {
    this.props.addProvider({
      name: this.state.responseName,
      specialty: this.state.bdPracticeName,
      address: this.state.responseAddress
    });
    //window.location.reload();
    //console.log(this.state.responseName);
    // axios
    //   .get(
    //     `https://api.betterdoctor.com/2016-03-01/doctors?name=${
    //       this.state.providerSearchName
    //     }&location=${this.state.value}&skip=0&limit=10&user_key=${
    //       process.env.REACT_APP_api_key2
    //     }`
    //   )
    //   .then(response => {
    //     this.setState({
    //       bdPhoto: response.data.data[0].profile.image_url,
    //       bdPhone: response.data.data[0].practices[0].phones[0].number,
    //       bdPracticeName: response.data.data[0].practices[0].name
    //     });
    //     console.log(
    //       this.state.bdImage,
    //       this.state.bdPhone,
    //       this.state.bdPracticeName
    //     );
    //   });
  }

  render() {
    console.log("test1");
    const { providers, isLoading } = this.props;
    let providerArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      providers.map((element, index) => {
        console.log("test2");
        return (
          <div className="providerDiv" key={index}>
            <div className="editable">{element.name}</div>
            <p>{element.specialty}</p>
            <p>{element.address}</p>
            <p>{element.city}</p>
            <p>{element.state}</p>
            <p>{element.zip}</p>
            <button onClick={() => this.editHandler}>Edit</button>
            <button onClick={() => this.deleteHandler(element.id)}>
              Delete
            </button>
          </div>
        );
      })
    );

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
          <p>{this.state.bdPracticeName}</p>
          <p>{this.state.bdPhone}</p>
          <img src={this.state.bdPhoto} alt="provider" />
          <br />
          <button onClick={this.confirmedProvider}>Confirm Provider</button>
          <button onClick={this.searchAgain}>Search Again</button>
          <br />
          <br />
          Provider not found?
          <br />
          <button>Add Provider Manually</button>
          <br />
          <br />
          {providerArray}
        </div>
        <Link to="/dashboard">
          <button>Exit</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    providers: state.providers
  };
}

export default connect(
  mapStateToProps,
  { removeProvider, addProvider, getProviders }
)(Provider);
