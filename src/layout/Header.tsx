import React from "react";
const { useAuth0 } = require("@auth0/auth0-react");

const Header = () => {
  const { logout } = useAuth0();
  return (
    <header>
      <button
        className="text-blue-500"
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        Logout
      </button>
    </header>
  );
};
export default Header;
