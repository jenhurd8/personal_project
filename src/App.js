import React, { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from "./routes.js";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">{routes}</div>
      </HashRouter>
    );
  }
}

export default App;
