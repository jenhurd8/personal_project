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
  }

  componentDidMount() {
    this.props.getVisits();
    this.props.getFamily();
    this.props.getProviders();
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Nav />
        <p>Log a New Visit</p>
        <select name="suffix" onChange={this.onChangeHandler}>
          <option value="">Select Provider</option>
          <option value="MD">Doctor</option>
          <option value="PA">Physician Assistant</option>
          <option value="Hospital">Hospital</option>
          <option value="Urgent Care">Urgent Care</option>
        </select>
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
