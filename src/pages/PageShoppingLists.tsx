import React from "react";
import CreatedShoppingLists from "../components/shoppingList/CreatedShoppingLists";
import { Redirect, Switch, Route, useRouteMatch } from "react-router";
import JoinedShoppingLists from "../components/shoppingList/JoinedShoppingLists";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import { useGetJoinedShoppingListsLazyQuery } from "../generated/graphql";

const PageShoppingLists = () => {
  let { path, url } = useRouteMatch();
  // Created Shopping Lists is default route, we don't need to prefetch
  // Pre fetch joined shopping lists
  const [getJoinedShoppingLists] = useGetJoinedShoppingListsLazyQuery();
  return (
    <Layout>
      <Link className="text-blue-500" to={`${url}/created`}>
        Created
      </Link>
      <Link
        className="text-blue-500"
        to={`${url}/joined`}
        onMouseOver={() => getJoinedShoppingLists()}
      >
        Joined
      </Link>
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
