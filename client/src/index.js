import React from "react";
import ReactDOM from "react-dom";
import jwt_decode from "jwt-decode";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

//import redux dependencies
import Store from "./Redux/Store";
import { Provider } from "react-redux";

//import types
import UserTypes from "./Redux/Types/UserTypes";

//import actions
import { SignOutAction } from "Redux/Actions/AuthAction";

//import layouts
import UserLayaout from "layouts/User";
import Home from "layouts/Home";
import Admin from "layouts/Admin";

//import services
import SetAuthToken from "./Services/SetAuthToken";
/**************************************************************************** */
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  SetAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  Store.dispatch({
    type: UserTypes.SIGN_IN,
    payload: decoded.user
  });

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    Store.dispatch(SignOutAction());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/home/sign-in";
  }
}
/**************************************************************************** */
ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Switch>
        <Route path="/user" render={props => <UserLayaout {...props} />} />
        <Route path="/home" render={props => <Home {...props} />} />

        <Route path="/admin" render={props => <Admin {...props} />} />

        <Redirect from="/" to="/home/welcom" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
