import React from "react";
const { useLocation } = require("react-router");

const Route404 = () => {
  let location = useLocation();

  return (
    <div>
      <h3>
        404! No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

export default Route404;
