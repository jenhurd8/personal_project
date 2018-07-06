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
    this.deleteHandler = this.deleteHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    this.props.getVisits();
    this.props.getFamily();
    this.props.getProviders();
  }

  deleteHandler(id) {
    this.props.removeVisit(id);
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { visits, isLoading, providers, family } = this.props;

    let visitsArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      visits.map((element, index) => {
        return (
          <div className="visits" key={index}>
            <div className="person">
              <p>{visits[index].image}</p>
              <p>{visits[index].familyname}</p>
              <p>{visits[index].dob.slice(0, 10)}</p>
            </div>
            <div className="visitDetails">
              Visit Details:
              <p>{element.details}</p>
              <p>{element.rx}</p>
            </div>
            <div className="dr">
              <img src={visits[index].photo} alt="provider" />
              <p>{visits[index].providersname}</p>
              <p>{visits[index].phone}</p>
              <p>{visits[index].address}</p>
            </div>
            <button onClick={() => this.deleteHandler(visits[index].visitid)}>
              Delete
            </button>
          </div>
        );
      })
    );

    // let providersArray = isLoading ? (
    //   <p>Loading...</p>
    // ) : (
    //   providers.map((element, index) => {
    //     return (
    //       <div className="providers" key={index}>provider
    //       </div>
    //       )
    //       }

    // let familyArray = isLoading ? (
    //   <p>Loading...</p>
    // ) : (
    //   this.props.family.map((element, index) => {
    //     return (
    //       <div className="family" key={index}>family</div>
    //   )
    //   }

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
        <div className="visit" />
        {visitsArray}
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
