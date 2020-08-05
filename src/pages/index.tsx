import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import PageDashboard from "./PageDashboard";
import PageShoppingList from "./PageShoppingList";

const Pages = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard">
        <PageDashboard />
      </Route>
      <Route path="/shopping-list/:id">
        <PageShoppingList />
      </Route>
    </Switch>
  );
};

export default Pages;
