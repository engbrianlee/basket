import { Route, Switch } from "react-router-dom";
import React from "react";
import Route404 from "./Route404";
import RouteDashboard from "./RouteDashboard";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={RouteDashboard} />
    <Route>
      <Route404 />
    </Route>
  </Switch>
);

export default Routes;
