import React from "react";
import "./Dashboard.css";
import { Component } from "react";
import Nav from "../../component/Nav/Nav.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getVisits,
  getFamily,
  getProviders,
  removeVisit
} from "../../redux/reducer";

class Dashboard extends Component {
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
        console.log(visits);
        if (visits[index].visitemail == "@gmail.com") {
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
        }
      })
    );

    let providersArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      providers.map((element, index) => {
        return (
          <div className="providers" key={index}>
            provider
          </div>
        );
      })
    );

    return (
      <div>
        <Nav />
        <div className="dashboard">
          <p> Dashboard</p>
          <br />
          <p>
            Welcome! Add a family member and healthcare provider to get started.
          </p>
          <div className="buttonDiv">
            <Link to="/family">
              <button>Add a family member</button>
            </Link>
            <Link to="/provider">
              <button>Add a healthcare provider</button>
            </Link>
          </div>
        </div>
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
)(Dashboard);
