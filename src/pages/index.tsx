import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import PageShoppingLists from "./PageShoppingLists";

const Pages = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/shoppingLists" />
      </Route>
      <Route path="/shoppingLists">
        <PageShoppingLists />
      </Route>
    </Switch>
  );
};

export default Pages;
