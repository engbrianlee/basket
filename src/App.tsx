import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { ApolloProvider } from "@apollo/client";
import Routes from "./routes";
import createApolloClient from "./lib/apolloClient";
import { Route, Switch } from "react-router";
import Loading from "./components/Loading";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

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

const ErrorFallback = ({
  error,
  componentStack,
  resetErrorBoundary,
}: FallbackProps) => {
  if (!error) {
    return null;
  }
  return (
    <div role="alert">
      <p>
        Something went wrong{" "}
        <span role="img" aria-label="Sad Emoji">
          😢
        </span>
        , sorry about that!
      </p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
const Bomb = (): never => {
  throw new Error("💥 CABOOM 💥");
};

const App = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [client] = useState(() => createApolloClient(getAccessTokenSilently));
  const [explode, setExplode] = useState(false);
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setExplode(false)}
        resetKeys={[explode]}
      >
        <Switch>
          {/* All routes should required authentication */}
          <ProtectedRoute component={Routes} />
        </Switch>
        {explode ? <Bomb /> : null}
      </ErrorBoundary>
    </ApolloProvider>
  );
};

export default App;
