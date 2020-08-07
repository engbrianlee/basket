import React from "react";
import CreatedShoppingLists from "../components/dashboard/OwnedShoppingLists";
import { Redirect, Switch, Route, useRouteMatch } from "react-router";
import JoinedShoppingLists from "../components/dashboard/SharedShoppingLists";
import Layout from "../layout/Layout";
import {
  useGetJoinedShoppingListsLazyQuery,
  useGetCreatedShoppingListsLazyQuery,
} from "../generated/graphql";
import { ApolloDataNotFoundError } from "../lib/error";
import ShoppingListsHeader, {
  ShoppingListsHeaderProps,
} from "../components/dashboard/ShoppingListsHeader";
import { useAuth0 } from "@auth0/auth0-react";
import useGlobalContext from "../components/context";
import Loading from "../components/Loading";
import TabLink from "../components/TabLink";

const PageDashboard = () => {
  let { path, url } = useRouteMatch();
  const [getJoinedShoppingLists] = useGetJoinedShoppingListsLazyQuery();
  const [getCreatedShoppingLists] = useGetCreatedShoppingListsLazyQuery();

  const { logout } = useAuth0();
  const {
    currentUser: { loading, data },
  } = useGlobalContext();

  let currentUser: ShoppingListsHeaderProps["currentUser"] | undefined | null =
    data?.current_user[0].user;

  let header: React.ReactNode;
  if (loading) {
    header = <Loading />;
  } else if (!currentUser) {
    throw new ApolloDataNotFoundError({ currentUser });
  } else {
    header = (
      <ShoppingListsHeader currentUser={currentUser} onLogout={logout} />
    );
  }

  return (
    <Layout>
      <div className="flex flex-col h-full">
        {header}
        <nav className="flex mt-6">
          <TabLink
            className="w-1/2 text-center border border-blue-500 rounded-md rounded-r-none"
            activeClassName="text-white bg-blue-500"
            inActiveClassName="bg-white text-blue-500"
            to={`${url}/owned`}
            onMouseOver={() => getCreatedShoppingLists()}
          >
            Owned
          </TabLink>
          <TabLink
            className="w-1/2 text-center border border-blue-500 rounded-md rounded-l-none"
            activeClassName="text-white bg-blue-500"
            inActiveClassName="bg-white text-blue-500"
            to={`${url}/shared`}
            onMouseOver={() => getJoinedShoppingLists()}
          >
            Shared
          </TabLink>
        </nav>
        <Switch>
          <Route path={path} exact>
            <Redirect to={`${url}/owned`} />
          </Route>
          <Route path={`${path}/owned`} exact>
            <CreatedShoppingLists />
          </Route>
          <Route path={`${path}/shared`} exact>
            <JoinedShoppingLists />
          </Route>
        </Switch>
      </div>
    </Layout>
  );
};

export default PageDashboard;
