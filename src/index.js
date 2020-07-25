import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience="basket"
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
