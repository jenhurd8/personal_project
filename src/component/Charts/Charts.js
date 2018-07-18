import React from "react";
import "./Charts.css";
import { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Nav from "../../component/Nav/Nav.js";
import { connect } from "react-redux";
import { getVisits, getFamily, getUser } from "../../redux/reducer";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
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

class Charts extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="charts">
          <div className="bar">
            <h2>Bar Example (custom size)</h2>
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
