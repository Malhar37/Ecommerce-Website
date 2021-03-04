import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../../apicalls/auth";

const UserRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated({ ...props }) ? (
          <Component />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default UserRoutes;
