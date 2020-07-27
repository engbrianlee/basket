import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Auth0ProviderOptions } from "@auth0/auth0-react/dist/auth0-provider";
import auth0Config from "./lib/auth0Config";
import "./tailwind/tailwind.output.css";

type Auth0ProviderWithHistoryProps = { children: React.ReactNode };
const Auth0ProviderWithHistory = ({
  children,
}: Auth0ProviderWithHistoryProps) => {
  const history = useHistory();

  const onRedirectCallback: Auth0ProviderOptions["onRedirectCallback"] = (
    appState
  ) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      audience={auth0Config.audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    {
      <Router>
        <Auth0ProviderWithHistory>
          <App />
        </Auth0ProviderWithHistory>
      </Router>
    }
  </React.StrictMode>,
  document.getElementById("root")
);
