import React from "react";
import "./Visit.css";
import { Component } from "react";
import Nav from "../../component/Nav/Nav.js";
import { connect } from "react-redux";
import {
  getVisits,
  getFamily,
  getProviders,
  removeVisit
} from "../../redux/reducer";

class Visit extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      details: "",
      rx: "",
      drSelected: "",
      patientSelected: ""
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.selectDrHandler = this.selectDrHandler.bind(this);
    this.selectPatientHandler = this.selectPatientHandler.bind(this);
    //this.chosenDr = this.chosenDr.bind(this);
  }

  componentDidMount() {
    this.props.getVisits();
    this.props.getFamily();
    this.props.getProviders();
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectDrHandler(dr) {
    this.setState(
      {
        drSelected: dr
      },
      console.log(this.state.drSelected)
    );
  }

  selectPatientHandler(patient) {
    this.setState({
      patientSelected: patient
    });
    console.log(this.state.patientSelected);
  }

  render() {
    const { providers, family } = this.props;

    let chosenDr = providers.map((provider, i) => {
      if (this.state.drSelected === provider.id) {
        return (
          <p>
            {provider.name}
            {provider.photo}
            {provider.address}
          </p>
        );
      }
    });

    let chosenFamily = family.map((familyMember, i) => {
      if (this.state.patientSelected === familyMember.id) {
        return (
          <p>
            {familyMember.name}
            {familyMember.photo}
            {familyMember.dob}
          </p>
        );
      }
    });

    let providersArray = providers.map((provider, i) => {
      return (
        <div>
          <button onClick={() => this.selectDrHandler(provider.id)}>
            {provider.name}
          </button>
        </div>
      );
    });

    let familyArray = family.map((family, i) => {
      return (
        <div>
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
        {familyArray}
        <div className="visitBox">
          {chosenDr}
          {chosenFamily}
          <br />
          Visit Date:
          <input
            name="date"
            // placeholder="date"
            type="date"
            onChange={this.onChangeHandler}
          />
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
          <br />
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
  { getVisits, getFamily, getProviders, removeVisit }
)(Visit);
