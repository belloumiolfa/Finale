import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

//import redux dependencies
import Store from "./Redux/Store";
import { Provider } from "react-redux";

//import layouts
import UserLayaout from "layouts/User";
import Home from "layouts/Home";
import Admin from "layouts/Admin";
import Wait from "Welcom/Wait";
import Confirm from "Welcom/Confirm";

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
