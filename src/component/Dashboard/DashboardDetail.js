import React, { Component } from "react";

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
      <div>
        <div>
          Visit Details:
          <p>{this.props.date}</p>
          <p>{this.props.details}</p>
          <p>{this.props.rx}</p>
          <p>${this.props.balance}</p>
          <button onClick={this.showEditMenu}>Edit Visit</button>
        </div>
        <div>
          {this.state.showEditMenu && (
            <div className="editMenu">
              <div>
                <div>
                  <p>Date of Visit:</p>
                  <input
                    name="date"
                    type="date"
                    onChange={this.props.onChangeHandler}
                  />
                  <button
                    onClick={() =>
                      this.props.updateVisitDate(this.props.visitId)
                    }
                  >
                    Submit
                  </button>
                </div>

                <div>
                  <p>Updated Visit Details:</p>
                  <input
                    name="details"
                    type="text"
                    onChange={this.props.onChangeHandler}
                  />
                  <button
                    onClick={() =>
                      this.props.updateVisitDetails(this.props.visitId)
                    }
                  >
                    Submit
                  </button>
                </div>

                <div>
                  <p>Update Prescriptions:</p>
                  <input
                    name="rx"
                    type="text"
                    onChange={this.props.onChangeHandler}
                  />
                  <button
                    onClick={() => this.props.updateVisitRx(this.props.visitId)}
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <p>Update Visit Balance:</p>
                  <input
                    name="balance"
                    type="number"
                    onChange={this.props.onChangeHandler}
                  />
                  <button
                    onClick={() =>
                      this.props.updateVisitBalance(this.props.visitId)
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
