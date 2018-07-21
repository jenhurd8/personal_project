import React from "react";
import "./Visit.css";
import { Component } from "react";
import Nav from "../../component/Nav/Nav.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getVisits,
  getFamily,
  getProviders,
  addVisit,
  getUser
} from "../../redux/reducer";
import Button from "@material-ui/core/Button";

class Visit extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      details: "",
      rx: "",
      balance: 0,
      email: "",
      drSelected: "",
      patientSelected: "",
      chosenFamily: [],
      chosenDr: []
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.selectDrHandler = this.selectDrHandler.bind(this);
    this.selectPatientHandler = this.selectPatientHandler.bind(this);
    this.selectDrHandler2 = this.selectDrHandler2.bind(this);
    this.selectPatientHandler2 = this.selectPatientHandler2.bind(this);
    this.addVisit = this.addVisit.bind(this);
  }

  componentDidMount() {
    this.props.getVisits();
    this.props.getFamily();
    this.props.getProviders();
    this.props.getUser().then(result => {
      this.setState({
        email: result.value.data.email
      });
    });
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectDrHandler2(dr) {
    this.setState({
      drSelected: dr
    });
  }

  selectDrHandler(dr) {
    this.selectDrHandler2(dr);
    this.setState({
      chosenDr: this.props.providers
        .filter(doctor => dr === doctor.id)
        .map((item, i) => {
          return (
            <div key={i}>
              <p>{item.name}</p>
              <br />
              <img src={item.photo} alt="doctor" />
            </div>
          );
        })
    });
  }

  selectPatientHandler2(patient) {
    this.setState({
      patientSelected: patient
    });
  }

  selectPatientHandler(patient) {
    this.selectPatientHandler2(patient);
    this.setState({
      chosenFamily: this.props.family
        .filter(person => patient === person.id)
        .map((item, key) => {
          return (
            <div key={key}>
              <p>{item.name}</p>
              <br />
              <img src={item.image} alt="person" />
            </div>
          );
        })
    });
  }

  addVisit(date, details, rx, email, balance) {
    this.props.addVisit({
      family_id: this.state.patientSelected,
      providers_id: this.state.drSelected,
      date: date,
      details: details,
      rx: rx,
      email: email,
      balance: balance
    });
    alert("Visit has been added to your dashboard");
  }

  render() {
    const { providers, family, isLoading } = this.props;
    let providersArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      providers
        .filter(provider => provider.email === this.state.email)
        .map((provider, i) => {
          return (
            <div key={i}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  background: "#64B5F6",
                  height: "50px",
                  width: "200px",
                  margin: "10px"
                }}
                onClick={() => this.selectDrHandler(provider.id)}
              >
                {provider.name}
              </Button>
            </div>
          );
        })
    );

    let familyArray = family
      .filter(family => family.email === this.state.email)
      .map((family, i) => {
        return (
          <div key={i}>
            <Button
              variant="contained"
              color="primary"
              style={{
                background: "#64B5F6",
                height: "50px",
                width: "200px",
                margin: "10px"
              }}
              onClick={() => this.selectPatientHandler(family.id)}
            >
              {family.name}
            </Button>
          </div>
        );
      });

    return (
      <div>
        <Nav />
        <div className="visit">
          <br />
          <h1>Log a New Visit</h1>
          <div className="visitBody">
            <div className="providerList">
              <br />
              {this.state.chosenDr}

              <br />
              <p>Select your Provider</p>

              {providersArray}
            </div>
            <div className="familyList">
              <br />
              {this.state.chosenFamily}

              <br />
              <p>Select your Family Member</p>

              {familyArray}
            </div>
            <div className="visitBox">
              <br />
              Visit Date:
              <input name="date" type="date" onChange={this.onChangeHandler} />
              <br />
              Visit Details:
              <input
                name="details"
                placeholder="Details"
                type="text"
                onChange={this.onChangeHandler}
              />
              <br />
              Prescriptions:
              <input
                name="rx"
                placeholder="Prescriptions"
                type="text"
                onChange={this.onChangeHandler}
              />
              <br />
              Visit Cost:
              <input
                name="balance"
                placeholder="Visit Cost"
                type="number"
                onChange={this.onChangeHandler}
              />
              <br />
              <Link to="/dashboard">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    background: "#64B5F6",
                    height: "50px",
                    width: "80px"
                  }}
                  onClick={() =>
                    this.addVisit(
                      this.state.date,
                      this.state.details,
                      this.state.rx,
                      this.state.email,
                      this.state.balance
                    )
                  }
                >
                  Add Visit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    family: state.family,
    visits: state.visits,
    providers: state.providers,
    loading: state.loading,
    users: state.users
  };
}

export default connect(
  mapStateToProps,
  {
    getVisits,
    getFamily,
    getProviders,
    addVisit,
    getUser
  }
)(Visit);
