import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { ApolloProvider } from "@apollo/client";
import Routes from "./routes";
import createApolloClient from "./lib/apolloClient";
import { Route, Switch } from "react-router";
import Loading from "./components/Loading";

type ProtectedRouteProps = {
  component: React.ComponentType<object>;
};
const ProtectedRoute = ({ component, ...props }: ProtectedRouteProps) => (
  <Route
    component={withAuthenticationRequired(component, {
      // Show a message while the user waits to be redirected to the login page.
      onRedirecting: () => <Loading />,
    })}
    {...props}
  />
);

const App = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [client] = useState(() => createApolloClient(getAccessTokenSilently));

  return (
    <ApolloProvider client={client}>
      <Switch>
        {/* All routes should required authentication */}
        <ProtectedRoute component={Routes} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
