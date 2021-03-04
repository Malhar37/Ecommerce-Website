import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../../apicalls/auth";

const AdminRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default AdminRoutes;
