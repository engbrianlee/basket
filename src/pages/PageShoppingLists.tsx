import React from "react";
import CreatedShoppingLists from "../components/shoppingList/CreatedShoppingLists";
import { Redirect, Switch, Route, useRouteMatch } from "react-router";
import JoinedShoppingLists from "../components/shoppingList/JoinedShoppingLists";
import Layout from "../layout/Layout";

const PageShoppingLists = () => {
  let { path, url } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route path={path} exact>
          <Redirect to={`${url}/created`} />
        </Route>
        <Route path={`${path}/created`} exact>
          <CreatedShoppingLists />
        </Route>
        <Route path={`${path}/joined`} exact>
          <JoinedShoppingLists />
        </Route>
      </Switch>
    </Layout>
  );
};

export default PageShoppingLists;
