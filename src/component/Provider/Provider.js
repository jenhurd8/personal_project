import React, { Component } from "react";
import "./Provider.css";
import Nav from "../../component/Nav/Nav.js";
import axios from "axios";
import ProviderOne from "./ProviderOne";
import { connect } from "react-redux";
import {
  getVisits,
  removeProvider,
  addProvider,
  getProviders,
  updateProvider,
  updateProviderName,
  updateProviderPracticeName,
  updateProviderAddress,
  updateProviderPhone,
  updateProviderPhoto,
  getUser
} from "../../redux/reducer";
import ToggleDisplay from "react-toggle-display";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
      bdPhoto:
        "http://res.cloudinary.com/jjenjjenjjen/image/upload/c_scale,w_200/v1530567672/computer-desk-doctor-48604_exuiyj.jpg",
      bdPhone: null,
      bdPracticeName: "",
      showEditMenu: false,
      editProviderMenu: false,
      name: "test",
      specialty: "test",
      address: "test",
      photo: "test",
      phone: "123",
      email: ""
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.searchAgain = this.searchAgain.bind(this);
    this.confirmedProvider = this.confirmedProvider.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.showEditMenu = this.showEditMenu.bind(this);
    this.updateProvider = this.updateProvider.bind(this);
    this.editProviderMenu = this.editProviderMenu.bind(this);
    this.updateProviderName = this.updateProviderName.bind(this);
    this.updateProviderAddress = this.updateProviderAddress.bind(this);
    this.updateProviderPhone = this.updateProviderPhone.bind(this);
    this.updateProviderPracticeName = this.updateProviderPracticeName.bind(
      this
    );
    this.updateProviderPhoto = this.updateProviderPhoto.bind(this);
  }

  componentDidMount() {
    this.props.getUser().then(result => {
      this.setState({
        email: result.value.data.email
      });
    });
    this.props.getProviders();
    this.props.getVisits();
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchAgain() {
    //forces page reload
    window.location.reload();
  }

  showEditMenu() {
    this.setState({ showEditMenu: !this.state.showEditMenu });
  }

  editProviderMenu() {
    this.setState({ editProviderMenu: !this.state.editProviderMenu });
  }

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
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${completeSearchString}&inputtype=textquery&fields=photos,place_id,icon,photos,plus_code,reference,formatted_address,name,rating,opening_hours,geometry&key=${
          process.env.REACT_APP_api_key
        }`
      )
      .then(response => {
        if (response.data.status !== "ZERO_RESULTS") {
          this.setState({
            responseName: response.data.candidates[0].name,
            responseAddress: response.data.candidates[0].formatted_address,
            responseId: response.data.candidates[0].place_id
          });
          axios
            .get(
              `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
                this.state.responseId
              }&fields=name,rating,formatted_phone_number&key=${
                process.env.REACT_APP_api_key
              }`
            )
            .then(response => {
              this.setState({
                bdPhone: response.data.result.formatted_phone_number
              });
              if (this.state.suffix === "MD") {
                axios
                  .get(
                    `https://api.betterdoctor.com/2016-03-01/doctors?name=${
                      this.state.providerSearchName
                    }&location=${this.state.value}&skip=0&limit=10&user_key=${
                      process.env.REACT_APP_api_key2
                    }`
                  )
                  .then(response => {
                    if (response.data.data.length !== 0) {
                      this.setState({
                        bdPhoto: response.data.data[0].profile.image_url,
                        bdPhone:
                          response.data.data[0].practices[0].phones[0].number,
                        bdPracticeName: response.data.data[0].practices[0].name
                      });
                    }
                  });
              }
              if (this.state.suffix === "Urgent Care") {
                this.setState({
                  bdPhoto:
                    "http://res.cloudinary.com/jjenjjenjjen/image/upload/c_scale,w_150/v1531601624/urgent-160140_1280_ew6omg.png"
                });
              }
              if (this.state.suffix === "Hospital") {
                this.setState({
                  bdPhoto:
                    "http://res.cloudinary.com/jjenjjenjjen/image/upload/c_scale,w_200/v1531601637/hospital-1636334_1920_cu7vox.jpg"
                });
              }
            });
        } else {
          this.setState({
            responseName: "No Providers Found"
          });
        }
      });
  }
  //name, specialty, address, photo, phone
  confirmedProvider() {
    this.props.addProvider({
      name: this.state.responseName && this.state.responseName,
      specialty: this.state.bdPracticeName && this.state.bdPracticeName,
      address: this.state.responseAddress && this.state.responseAddress,
      photo: this.state.bdPhoto && this.state.bdPhoto,
      phone: this.state.bdPhone && this.state.bdPhone,
      email: this.state.email && this.state.email
    });
    window.location.reload();
  }

  updateProvider(id) {
    this.props.updateProvider(id, {
      name: this.state.name,
      specialty: this.state.specialty,
      address: this.state.address,
      photo: this.state.photo,
      phone: this.state.phone,
      email: this.state.email
    });
    window.location.reload();
  }

  updateProviderName(id) {
    this.props.updateProviderName(id, {
      name: this.state.name
    });
    window.location.reload();
  }

  updateProviderPracticeName(id) {
    this.props.updateProviderPracticeName(id, {
      specialty: this.state.specialty
    });
    window.location.reload();
  }

  updateProviderAddress(id) {
    this.props.updateProviderAddress(id, {
      address: this.state.address
    });
    window.location.reload();
  }

  updateProviderPhoto(id) {
    this.props.updateProviderPhoto(id, {
      photo: this.state.photo
    });
    window.location.reload();
  }

  updateProviderPhone(id) {
    this.props.updateProviderPhone(id, {
      phone: this.state.phone
    });
    window.location.reload();
  }

  render() {
    const { providers, isLoading } = this.props;
    let providerArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      providers
        .filter(provider => provider.email === this.state.email)
        .map((element, index) => {
          //if (element.email === this.state.email) {
          return (
            <div className="providerDiv" key={index}>
              <Grid container>
                <Grid item sm>
                  <Paper
                    style={{
                      padding: 20,
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: "#BBDEFB"
                    }}
                  >
                    <ProviderOne
                      key={index}
                      id={element.id}
                      name={element.name}
                      specialty={element.specialty}
                      address={element.address}
                      phone={element.phone}
                      photo={element.photo}
                      onChangeHandler={this.onChangeHandler}
                      deleteHandler={this.deleteHandler}
                      updateProviderName={this.updateProviderName}
                      updateProviderPracticeName={
                        this.updateProviderPracticeName
                      }
                      updateProviderAddress={this.updateProviderAddress}
                      updateProviderPhoto={this.updateProviderPhoto}
                      updateProviderPhone={this.updateProviderPhone}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          );
          // }
        })
    );

    return (
      <div className="providerPage">
        <Nav />
        <div className="provider">
          <div className="inputs">
            Add a doctor or health care provider here:
            <br />
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
            <Button
              variant="contained"
              color="primary"
              style={{ background: "#64B5F6", height: "90px", width: "120px" }}
              onClick={() =>
                this.onSearchHandler(this.state.providerSearchName)
              }
            >
              Click to Search for Provider
            </Button>
            {"    "}
            <Button
              variant="contained"
              color="primary"
              style={{ background: "#64B5F6", height: "90px", width: "120px" }}
              onClick={this.searchAgain}
            >
              Search Again
            </Button>
            <br />
            <p>{this.state.responseName}</p>
            <p>{this.state.responseAddress}</p>
            <p>{this.state.bdPhone}</p>
            <p>{this.state.bdPracticeName}</p>
            <img src={this.state.bdPhoto} alt="provider" />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{ background: "#64B5F6", height: "90px", width: "120px" }}
              onClick={this.confirmedProvider}
            >
              Confirm Provider and Add to List
            </Button>
            <br />
            <br />
            Provider not found?
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{ background: "#64B5F6", height: "80px", width: "80px" }}
              onClick={this.showEditMenu}
            >
              Add A New Provider
            </Button>
            <ToggleDisplay if={this.state.showEditMenu}>
              <div className="editMenu">
                <div>
                  <p>New Provider Name:</p>
                  <input
                    name="responseName"
                    type="text"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div>
                  <p>New Provider Address:</p>
                  <input
                    name="responseAddress"
                    type="text"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div>
                  <p>New Provider Phone:</p>
                  <input
                    name="bdPhone"
                    type="text"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div>
                  <p>New Practice Name:</p>
                  <input
                    name="bdPracticeName"
                    type="text"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div>
                  <p>Add a Provider Image:</p>
                  <input
                    name="bdPhoto"
                    type="text"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    background: "#64B5F6",
                    height: "80px",
                    width: "80px"
                  }}
                  onClick={this.confirmedProvider}
                >
                  Submit New Provider
                </Button>
              </div>
            </ToggleDisplay>
            <br />
            <br />
          </div>
          <div className="providerArray">
            <h1>Your Provider List</h1>
            {/* <button onClick={this.editProviderMenu}>Edit Provider Menu</button> */}
            <br />
            {providerArray}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    providers: state.providers,
    visits: state.visits,
    users: state.users
  };
}

export default connect(
  mapStateToProps,
  {
    getVisits,
    removeProvider,
    addProvider,
    getProviders,
    updateProvider,
    updateProviderName,
    updateProviderPracticeName,
    updateProviderAddress,
    updateProviderPhone,
    updateProviderPhoto,
    getUser
  }
)(Provider);
