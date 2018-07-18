import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard/Dashboard.js";
import Family from "./component/Family/Family.js";
import Landing from "./component/Landing/Landing.js";
import Provider from "./component/Provider/Provider.js";
import Visit from "./component/Visit/Visit.js";
import Charts from "./component/Charts/Charts.js";

export default (
  <Switch>
    <Route component={Landing} exact path="/" />
    <Route component={Dashboard} path="/dashboard" />
    <Route component={Family} path="/family" />
    <Route component={Provider} path="/provider" />
    <Route component={Visit} path="/visit" />
    <Route component={Charts} path="/charts" />
  </Switch>
);
