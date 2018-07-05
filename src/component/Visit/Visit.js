import React from "react";
import "./Visit.css";
import { Component } from "react";
import Nav from "../../component/Nav/Nav.js";
import { connect } from "react-redux";
import { getVisits, getFamily, getProviders } from "../../redux/reducer";

class Visit extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      details: "",
      rx: ""
    };
    // this.onChangeHandler = this.onChangeHandler.bind(this);
    // this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    this.props.getVisits();
    this.props.getFamily();
    this.props.getProviders();
  }

  render() {
    const { visits, isLoading, family } = this.props;

    console.log(visits);

    let visitsArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      visits.map((element, index) => {
        return (
          <div className="visits" key={index}>
            <p>{visits[index].familyname}</p>
            <p>{visits[index].dob}</p>

            <p>{element.family_id}</p>
            <p>{element.providers_id}</p>
            <p>{element.date}</p>
            <p>{element.details}</p>
            <p>{element.rx}</p>
            {/* <button onClick={() => this.editHandler}>Edit</button>
            <button onClick={() => this.deleteHandler(element.id)}> 
          Delete
            </button>*/}
          </div>
        );
      })
    );

    return (
      <div>
        <Nav />
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
  { getVisits, getFamily, getProviders }
)(Visit);
