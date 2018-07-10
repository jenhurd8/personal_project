import React from "react";
import "./Visit.css";
import { Component } from "react";
import Nav from "../../component/Nav/Nav.js";
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
      drSelected: "",
      patientSelected: ""
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.selectDrHandler = this.selectDrHandler.bind(this);
    this.selectPatientHandler = this.selectPatientHandler.bind(this);
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

  addVisit(patient, dr, date, details, rx, email) {
    this.props.addVisit({
      family_id: patient,
      providers_id: dr,
      date: date,
      details: details,
      rx: rx,
      email: email
    });
    alert("Visit has been added to your dashboard");
    window.location.reload();
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
      return;
    });

    //come back to this and fix using filter and map to avoid nonreturn error above
    //need to filter and then map matched item**
    // let chosenDr = providers.filter(
    //   (provider => this.state.drSelected === provider.id).map(element => (
    //     <p>{element.name}</p>
    //   ))

    // .map((provider, i) => (
    //   <p>
    //     {provider.name}
    //     {provider.photo}
    //     {provider.address}
    //   </p>
    // ))
    //

    console.log(chosenDr);

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
      return;
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
        <p>Select your Family Member</p>
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
          <button
            onClick={() =>
              this.addVisit(
                this.state.patientSelected,
                this.state.drSelected,
                this.state.date,
                this.state.details,
                this.state.rx,
                this.state.email
              )
            }
          >
            Add Visit
          </button>
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
  { getVisits, getFamily, getProviders, addVisit }
)(Visit);
