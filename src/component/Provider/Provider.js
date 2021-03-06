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
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

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
    this.props.getProviders();
    this.props.getVisits();
    this.props.getUser().then(result => {
      this.setState({
        email: result.value.data.email
      });
    });
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchAgain() {
    window.location.reload();
  }

  showEditMenu() {
    this.setState({ showEditMenu: !this.state.showEditMenu });
  }

  editProviderMenu() {
    this.setState({ editProviderMenu: !this.state.editProviderMenu });
  }

  deleteHandler(id) {
    const { visits } = this.props;

    visits.map((element, index) => {
      if (element.providers_id === id) {
        alert("You cannot delete a provider that is in use on the dashboard!");
      } else {
        this.props.removeProvider(id);
      }
    });
  }

  onSearchHandler() {
    console.log(this.state.suffix);
    console.log(this.state.value);
    let completeSearchString = `${this.state.providerSearchName} ${
      this.state.suffix
    } ${this.state.value}`;

    axios.get(`/api/searchGoogle/${completeSearchString}`).then(response => {
      if (response.data.status !== "ZERO_RESULTS") {
        this.setState({
          responseName: response.data.candidates[0].name,
          responseAddress: response.data.candidates[0].formatted_address,
          responseId: response.data.candidates[0].place_id
        });
        axios
          .get(`/api/searchGoogle2/${this.state.responseId}`)
          .then(response => {
            this.setState({
              bdPhone: response.data.result.formatted_phone_number
            });

            if (this.state.suffix === "MD") {
              let config = {
                params: {
                  name: this.state.providerSearchName,
                  state: this.state.value
                }
              };

              axios
                .get(
                  `/api/betterDoctor/${this.state.providerSearchName}/${
                    this.state.value
                  }`
                )

                .then(response => {
                  console.log(response.data);
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

  confirmedProvider() {
    this.props
      .addProvider({
        name: this.state.responseName,
        specialty: this.state.bdPracticeName,
        address: this.state.responseAddress,
        photo: this.state.bdPhoto,
        phone: this.state.bdPhone,
        email: this.state.email
      })
      .then(
        this.setState({
          name: "",
          specialty: "",
          address: "",
          photo: "",
          phone: ""
        })
      );
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
  }

  updateProviderName(id) {
    this.props.updateProviderName(id, {
      name: this.state.name
    });
  }

  updateProviderPracticeName(id) {
    this.props.updateProviderPracticeName(id, {
      specialty: this.state.specialty
    });
  }

  updateProviderAddress(id) {
    this.props.updateProviderAddress(id, {
      address: this.state.address
    });
  }

  updateProviderPhoto(id) {
    this.props.updateProviderPhoto(id, {
      photo: this.state.photo
    });
  }

  updateProviderPhone(id) {
    this.props.updateProviderPhone(id, {
      phone: this.state.phone
    });
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
            <br />
            Add a doctor or health care provider here:
            <TextField
              label="Provider Name"
              name="providerSearchName"
              placeholder="Provider's First Last (ex: John Jones)"
              type="text"
              onChange={this.onChangeHandler}
              margin="dense"
            />
            <br />
            <FormControl>
              <InputLabel>Provider Type</InputLabel>
              <NativeSelect
                onChange={this.onChangeHandler}
                input={<Input name="suffix" />}
              >
                <option value="" />
                <option value={""}>Select Provider Type</option>
                <option value={"MD"}>Doctor</option>
                <option value={"PA"}>Physician Assistant</option>
                <option value={"Hospital"}>Hospital</option>
                <option value={"Urgent Care"}>Urgent Care</option>
              </NativeSelect>

              <br />
              <NativeSelect
                onChange={this.onChangeHandler}
                input={<Input name="value" />}
              >
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
              </NativeSelect>
            </FormControl>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                background: "#bbdefb",
                color: "#0d47a1",
                height: "50px",
                width: "200px"
              }}
              onClick={() =>
                this.onSearchHandler(this.state.providerSearchName)
              }
            >
              Search for Provider
            </Button>{" "}
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{
                background: "#bbdefb",
                color: "#0d47a1",
                height: "50px",
                width: "100px"
              }}
              onClick={this.searchAgain}
            >
              Reset
            </Button>
            <br />
            {"    "}
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
              style={{
                background: "#bbdefb",
                color: "#0d47a1",
                height: "50px",
                width: "200px"
              }}
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
              style={{
                background: "#bbdefb",
                color: "#0d47a1",
                height: "50px",
                width: "200px"
              }}
              onClick={this.showEditMenu}
            >
              Add A New Provider
            </Button>
            <ToggleDisplay if={this.state.showEditMenu}>
              <div className="editMenu">
                <div>
                  <TextField
                    label="New Provider Name"
                    name="responseName"
                    placeholder="New Provider Name"
                    type="text"
                    onChange={this.onChangeHandler}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextField
                    label="New Provider Address"
                    name="responseAddress"
                    placeholder="New Provider Address"
                    type="text"
                    onChange={this.onChangeHandler}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextField
                    label="New Provider Phone"
                    name="bdPhone"
                    placeholder="New Provider Phone"
                    type="text"
                    onChange={this.onChangeHandler}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextField
                    label="New Provider Name"
                    name="bdPracticeName"
                    placeholder="New Provider Name"
                    type="text"
                    onChange={this.onChangeHandler}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextField
                    label="Add a Provider Image"
                    name="bdPhoto"
                    placeholder="Add a Provider Image"
                    type="text"
                    onChange={this.onChangeHandler}
                    margin="normal"
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
