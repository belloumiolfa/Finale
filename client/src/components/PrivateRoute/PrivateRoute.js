import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ render: Component, Auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/home/sign-in" />
      )
    }
  />
);

const mapStateToProps = state => ({
  Auth: state.Authentification
});

export default connect(mapStateToProps)(PrivateRoute);
