import React from "react";
import "./Charts.css";
import { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Nav from "../../component/Nav/Nav.js";
import { connect } from "react-redux";
import { getVisits, getFamily, getUser } from "../../redux/reducer";
import _ from "lodash";

const data = {
  labels: "",
  datasets: [
    {
      label: "Cost per Year",
      backgroundColor: ["#0082c8", "#46f0f0", "#911eb4", "#f032e6", "#008080"],
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: "",
      maintainAspectRatio: false
    }
  ]
};

class Charts extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }

  componentDidMount() {
    this.props.getVisits();

    this.props.getFamily();
    this.props.getUser().then(result => {
      this.setState({
        email: result.value.data.email
      });
    });
  }

  barMaker() {
    console.log(this.props.visits);

    let newVisits = this.props.visits.map((element, index) => {
      return {
        date: element.date.slice(0, 4),
        email: element.email === this.state.email,
        balance: element.balance
      };
    });
    console.log(newVisits);
    console.log(this.state.email);

    newVisits = newVisits.filter(item => item.email === true);

    let lodashResult = _.reduce(
      newVisits,
      function(result, value, key) {
        result[value.date] = result[value.date] || 0;
        result[value.date] += value.balance;
        return result;
      },
      {}
    );

    let newLo = Object.entries(lodashResult).map(([key, value]) => ({
      key,
      value
    }));

    let years = newLo.map(element => element.key);
    let balances = newLo.map(element => element.value);

    data.labels = years;
    data.datasets[0].data = balances;
  }

  render() {
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
            <Doughnut data={data} height={400} />
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
