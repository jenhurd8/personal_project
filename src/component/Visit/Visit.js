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
  addVisit
} from "../../redux/reducer";

class Visit extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      details: "",
      rx: "",
      balance: 0,
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
        .map(item => {
          return (
            <div>
              <p>{item.name}</p>
              <img src={item.photo} alt="doctor" />
            </div>
          );
        })
    });

    console.log(this.state.drSelected);
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
        .map(item => {
          return (
            <div>
              <p>{item.name}</p>
              <img src={item.image} alt="person" />
            </div>
          );
        })
    });

    console.log(this.state.chosenFamily);
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
    const { providers, family } = this.props;

    let providersArray = providers.map((provider, i) => {
      return (
        <div key={i}>
          <button onClick={() => this.selectDrHandler(provider.id)}>
            {provider.name}
          </button>
        </div>
      );
    });

    let familyArray = family.map((family, i) => {
      return (
        <div key={i}>
          <button onClick={() => this.selectPatientHandler(family.id)}>
            {family.name}
          </button>
        </div>
      );
    });

    return (
      <div>
        <Nav />
        <p>Log a New Visit</p>
        <p>Select your Provider</p>
        {providersArray}
        <p>Select your Family Member</p>
        {familyArray}
        <div className="visitBox">
          {this.state.chosenDr}
          {this.state.chosenFamily}
          <br />
          Visit Date:
          <input name="date" type="date" onChange={this.onChangeHandler} />
          <br />
          <br />
          Visit Details:
          <input
            name="details"
            placeholder="Details"
            type="text"
            onChange={this.onChangeHandler}
          />
          <br />
          <br />
          Prescriptions:
          <input
            name="rx"
            placeholder="Prescriptions"
            type="text"
            onChange={this.onChangeHandler}
          />
          Balance:
          <input
            name="balance"
            placeholder="Balance"
            type="number"
            onChange={this.onChangeHandler}
          />
          {/* redirect is giving dob.slice error and not showing update after refresh*/}
          <Link to="/dashboard">
            <button
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
            </button>
          </Link>
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
    loading: state.loading
  };
}

export default connect(
  mapStateToProps,
  {
    getVisits,
    getFamily,
    getProviders,
    addVisit
  }
)(Visit);
