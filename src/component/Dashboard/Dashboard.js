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
  removeVisit,
  updateVisitDate,
  updateVisitDetails,
  updateVisitRx
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
    const { visits, isLoading } = this.props;

    let visitsArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      visits.map((element, index) => {
        console.log(visits);
        //turn this back on when linked to logged in persons emai
        //if (visits[index].visitemail === "@gmail.com") {
        return (
          <div className="visits" key={index}>
            <div className="person">
              <img src={visits[index].image} alt="person" />
              <p>{visits[index].familyname}</p>
              <p>{visits[index].dob && visits[index].dob.slice(0, 10)}</p>
            </div>
            <div className="visitDetails">
              Visit Details:
              <p>{element.date && element.date.slice(0, 10)}</p>
              <p>{element.details}</p>
              <p>{element.rx}</p>
              <button onClick={this.showEditMenu}>Edit Visit</button>
              {this.state.showEditMenu && (
                <div className="editMenu">
                  <div>
                    <div>
                      <p>Date of Visit:</p>
                      <input
                        name="date"
                        type="date"
                        onChange={this.onChangeHandler}
                      />
                      <button onClick={() => this.updateVisitDate(element.id)}>
                        Submit
                      </button>
                    </div>

                    <div>
                      <p>Updated Visit Details:</p>
                      <input
                        name="details"
                        type="text"
                        onChange={this.onChangeHandler}
                      />
                      <button
                        onClick={() => this.updateVisitDetails(element.id)}
                      >
                        Submit
                      </button>
                    </div>

                    <div>
                      <p>Update Prescriptions:</p>
                      <input
                        name="rx"
                        type="text"
                        onChange={this.onChangeHandler}
                      />
                      <button onClick={() => this.updateVisitRx(element.id)}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
        //  }
      })
    );

    // let providersArray = isLoading ? (
    //   <p>Loading...</p>
    // ) : (
    //   providers.map((element, index) => {
    //     return (
    //       <div className="providers" key={index}>
    //         provider
    //       </div>
    //     );
    //   })
    // );

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
  {
    getVisits,
    getFamily,
    getProviders,
    removeVisit,
    updateVisitDate,
    updateVisitDetails,
    updateVisitRx
  }
)(Dashboard);
