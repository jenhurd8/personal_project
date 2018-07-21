import React, { Component } from "react";
import "./DashboardDetail.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class DashboardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditMenu: false
    };
    this.showEditMenu = this.showEditMenu.bind(this);
  }

  showEditMenu() {
    this.setState({ showEditMenu: !this.state.showEditMenu });
  }

  render() {
    return (
      <div className="visitDetailBox">
        <div>
          Visit Details:
          <p>{this.props.date}</p>
          <p>{this.props.details}</p>
          <p>{this.props.rx}</p>
          <p>${this.props.balance}</p>
          {/* <button onClick={this.showEditMenu}>Edit Visit</button> */}
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#0D47A1" }}
            onClick={this.showEditMenu}
          >
            Edit Visit
          </Button>
        </div>
        <div>
          {this.state.showEditMenu && (
            <div className="editMenu">
              <div>
                <div>
                  <TextField
                    //id="dob"
                    label="Date of Visit"
                    name="date"
                    // placeholder="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    onChange={this.props.onChangeHandler}
                    margin="normal"
                  />
                  {/* <p>Date of Visit:</p>
                  <input
                    name="date"
                    type="date"
                    onChange={this.props.onChangeHandler}
                  /> */}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background: "#64B5F6",
                      height: "10px",
                      width: "10px"
                    }}
                    onClick={() =>
                      this.props.updateVisitDate(this.props.visitId)
                    }
                  >
                    Submit
                  </Button>
                </div>

                <div>
                  <TextField
                    //id="image"
                    label="Visit Details"
                    name="details"
                    placeholder="Visit Details"
                    type="text"
                    onChange={this.props.onChangeHandler}
                    margin="normal"
                  />
                  {/* <p>Updated Visit Details:</p>
                  <input
                    name="details"
                    type="text"
                    onChange={this.props.onChangeHandler}
                  /> */}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background: "#64B5F6",
                      height: "10px",
                      width: "10px"
                    }}
                    onClick={() =>
                      this.props.updateVisitDetails(this.props.visitId)
                    }
                  >
                    Submit
                  </Button>
                </div>

                <div>
                  <TextField
                    //id="image"
                    label="Prescriptions"
                    name="rx"
                    placeholder="Prescriptions"
                    type="text"
                    onChange={this.props.onChangeHandler}
                    margin="normal"
                  />
                  {/* <p>Update Prescriptions:</p>
                  <input
                    name="rx"
                    type="text"
                    onChange={this.props.onChangeHandler}
                  /> */}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background: "#64B5F6",
                      height: "10px",
                      width: "10px"
                    }}
                    onClick={() => this.props.updateVisitRx(this.props.visitId)}
                  >
                    Submit
                  </Button>
                </div>
                <div>
                  <TextField
                    //id="image"
                    label="Visit Cost"
                    name="balance"
                    placeholder="Visit Cost"
                    type="text"
                    onChange={this.props.onChangeHandler}
                    margin="normal"
                  />
                  {/* <p>Update Visit Cost:</p>
                  <input
                    name="balance"
                    type="number"
                    onChange={this.props.onChangeHandler}
                  /> */}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background: "#64B5F6",
                      height: "10px",
                      width: "10px"
                    }}
                    onClick={() =>
                      this.props.updateVisitBalance(this.props.visitId)
                    }
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
