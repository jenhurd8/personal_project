import React from "react";
import "./Charts.css";
import { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Nav from "../../component/Nav/Nav.js";
import { connect } from "react-redux";
import { getVisits, getFamily, getUser } from "../../redux/reducer";
import _ from "lodash";

class Charts extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      filteredFamily: [],
      dateBalance: [],
      years: [],
      balances: [],
      lodashResult: []
    };
  }

  componentDidMount() {
    this.props.getVisits();
    //   .then(
    //     this.setState({
    //       dateBalance: this.props.visits
    //     })
    //   )
    //   .then(console.log("test" + this.props.visits));

    this.props.getFamily();
    // this.props.getUser().then(result => {
    //   this.setState({
    //     email: result.value.data.email
    //   });
    // });
  }

  barMaker() {
    let newVisits = this.props.visits.map((element, index) => {
      return {
        date: element.date.slice(0, 4),
        email: element.email,
        balance: element.balance
      };
    });

    // (data.labels = newVisits.map(visit => visit.date)),
    //   (data.datasets[0].data = newVisits.map(visit => visit.balance));

    let lodashResult = _.reduce(
      newVisits,
      function(result, value, key) {
        result[value.date] = result[value.date] || 0;
        result[value.date] += value.balance;
        return result;
      },
      {}
    );
    console.log(lodashResult);

    let newLo = Object.entries(lodashResult).map(([key, value]) => ({
      key,
      value
    }));
    console.log(newLo);
  }

  barMaker2() {
    console.log("test");
    // var keys = this.state.lodashResult.map(function(el) {
    //   return Object.keys(el)[0];
    // });
    // console.log(keys);
  }

  render() {
    // console.log(this.props.visits);
    // console.log("years" + data.labels);
    // console.log("balances" + data.datasets[0].data);
    this.barMaker();

    return (
      <div>
        <Nav />
        <div className="charts">
          <div className="bar">
            <h2>Yearly Health Costs</h2>
            <Bar
              data={data}
              width={500}
              height={250}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
          <div className="doughnut">
            <h2>Doughnut Example</h2>
            <Doughnut data={data} />
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
    loading: state.loading,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  {
    getVisits,
    getFamily,
    getUser
  }
)(Charts);

const data = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  labels: "",
  datasets: [
    {
      label: "Cost per Year",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: ""
    }
  ]
};

const data2 = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};
