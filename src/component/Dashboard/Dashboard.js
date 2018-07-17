import React from "react";
import "./Dashboard.css";
import { Component } from "react";
import DashboardDetail from "./DashboardDetail";
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
  updateVisitRx,
  updateVisitBalance,
  getUser
} from "../../redux/reducer";

class Dashboard extends Component {
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
      showEditMenu: false
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.showEditMenu = this.showEditMenu.bind(this);
    this.updateVisitDate = this.updateVisitDate.bind(this);
    this.updateVisitDetails = this.updateVisitDetails.bind(this);
    this.updateVisitRx = this.updateVisitRx.bind(this);
    this.updateVisitBalance = this.updateVisitBalance.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
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

  deleteHandler(id) {
    this.props.removeVisit(id);
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showEditMenu() {
    this.setState({ showEditMenu: !this.state.showEditMenu });
  }

  updateVisitDate(id) {
    this.props.updateVisitDate(id, {
      date: this.state.date
    });
    window.location.reload();
  }

  updateVisitDetails(id) {
    this.props.updateVisitDetails(id, {
      details: this.state.details
    });
    window.location.reload();
  }

  updateVisitRx(id) {
    this.props.updateVisitRx(id, {
      rx: this.state.rx
    });
    window.location.reload();
  }

  updateVisitBalance(id) {
    this.props.updateVisitBalance(id, {
      balance: this.state.balance
    });
    window.location.reload();
  }

  isLoggedIn() {
    console.log(this.state.email);
    if (!this.state.email) {
      return <p>Warning! You are not logged in, your data will not be saved</p>;
    }
  }

  render() {
    const { visits, isLoading } = this.props;

    let visitsArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      visits.map((element, index) => {
        let dashboardVisitId = visits[index].visitid;
        if (visits[index].visitemail === this.state.email) {
          return (
            <div className="visits" key={index}>
              <div className="person">
                <img src={visits[index].image} alt="person" />
                <p>{visits[index].familyname}</p>
                <p>{visits[index].dob && visits[index].dob.slice(0, 10)}</p>
              </div>
              <div className="visitDetails">
                <DashboardDetail
                  date={element.date.slice(0, 10)}
                  details={element.details}
                  rx={element.rx}
                  balance={element.balance}
                  visitId={dashboardVisitId}
                  onChangeHandler={this.onChangeHandler}
                  updateVisitDate={this.updateVisitDate}
                  updateVisitBalance={this.updateVisitBalance}
                  updateVisitDetails={this.updateVisitDetails}
                  updateVisitRx={this.updateVisitRx}
                />
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

    return (
      <div>
        <Nav />
        <div className="dashboard">
          <p> Dashboard</p>
          <br />
          <p>
            Welcome! Add a family member and healthcare provider to get started.
          </p>
          <br />
          {this.isLoggedIn()}
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
    loading: state.loading,
    user: state.user
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
    updateVisitRx,
    updateVisitBalance,
    getUser
  }
)(Dashboard);
