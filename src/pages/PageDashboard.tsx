import React from "react";
import CreatedShoppingLists, {
  GET_CREATED_SHOPPING_LISTS,
} from "../components/dashboard/OwnedShoppingLists";
import { Redirect, Switch, Route, useRouteMatch } from "react-router";
import JoinedShoppingLists from "../components/dashboard/SharedShoppingLists";
import Layout from "../layout/Layout";
import { Link, LinkProps } from "react-router-dom";
import {
  useGetJoinedShoppingListsLazyQuery,
  useCreateShoppingListMutation,
  GetCreatedShoppingListsQuery,
} from "../generated/graphql";
import classNames from "classnames";
import ShoppingList, {
  DEFAULT_NEW_LIST_TITLE,
} from "../components/dashboard/ShoppingList";
import { gql } from "@apollo/client";
import { ApolloDataNotFoundError } from "../lib/error";
import produce from "immer";
import { formatISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import ShoppingListsHeader, {
  ShoppingListsHeaderProps,
} from "../components/dashboard/ShoppingListsHeader";
import { useAuth0 } from "@auth0/auth0-react";
import useGlobalContext from "../components/context";
import Loading from "../components/Loading";

type TabLinkProps = {
  children: React.ReactNode;
  to: string;
  activeOnlyWhenExact?: boolean;
  className?: string;
  activeClassName?: string;
  inActiveClassName?: string;
} & LinkProps &
  typeof TabLinkDefaultProps;
const TabLinkDefaultProps = {
  activeOnlyWhenExact: false,
};

const TabLink = ({
  children,
  to,
  activeOnlyWhenExact,
  className,
  activeClassName,
  inActiveClassName,
  ...props
}: TabLinkProps) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <Link
      to={to}
      className={classNames(
        className,
        match ? activeClassName : inActiveClassName
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
TabLink.defaultProps = TabLinkDefaultProps;
const PageDashboard = () => {
  let { path, url } = useRouteMatch();
  const isOwnedRoute = useRouteMatch({ path: `${url}/owned` });
  // Created Shopping Lists is default route, we don't need to prefetch
  // Pre fetch joined shopping lists
  const [getJoinedShoppingLists] = useGetJoinedShoppingListsLazyQuery();

  const [createShoppingList] = useCreateShoppingListMutation({
    update: (cache, { data }) => {
      const query = GET_CREATED_SHOPPING_LISTS;
      const cachedData = cache.readQuery<GetCreatedShoppingListsQuery>({
        query,
      });
      const newData = produce(cachedData, (t) => {
        const created_shopping_lists =
          t?.current_user[0].user?.created_shopping_lists;
        if (!created_shopping_lists) {
          throw new ApolloDataNotFoundError({ created_shopping_lists });
        }
        const insert_shopping_lists_one = data?.insert_shopping_lists_one;
        if (!insert_shopping_lists_one) {
          throw new ApolloDataNotFoundError({ insert_shopping_lists_one });
        }
        created_shopping_lists.unshift(insert_shopping_lists_one);
      });
      if (newData) {
        cache.writeQuery<GetCreatedShoppingListsQuery>({
          query,
          data: newData,
        });
      }
    },
  });

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
        {/* https://stackoverflow.com/questions/21515042/scrolling-a-flexbox-with-overflowing-content */}
        <div className="flex flex-col items-center justify-between flex-1 flex-grow mt-4 overflow-auto">
          <div
            className="flex w-full overflow-auto scrolling-auto"
            style={{ minHeight: "min-content" }}
          >
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
          {isOwnedRoute && (
            <button
              onClick={() => {
                const now = formatISO(new Date());
                createShoppingList({
                  variables: { title: DEFAULT_NEW_LIST_TITLE },
                  optimisticResponse: {
                    insert_shopping_lists_one: {
                      __typename: "shopping_lists",
                      active_users: [],
                      created_at: now,
                      updated_at: now,
                      creator: { name: "Mock", public_id: "testId" },
                      id: uuidv4(),
                      title: DEFAULT_NEW_LIST_TITLE,
                    },
                  },
                });
              }}
            >
              <svg
                className="text-blue-500 w-18 h-18"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

const CREATE_SHOPPING_LIST = gql`
  mutation createShoppingList($title: String!) {
    insert_shopping_lists_one(object: { title: $title }) {
      ...ShoppingListData
    }
  }
  ${ShoppingList.fragment}
`;

export { CREATE_SHOPPING_LIST };
export default PageDashboard;
