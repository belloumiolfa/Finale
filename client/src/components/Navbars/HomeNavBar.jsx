import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import HomeNavBarLinks from "./HomeNavBarLinks";
import routes from "../../routes";

class HomeNavBar extends Component {
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#pablo">{this.props.brandText}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <HomeNavBarLinks {...this.props} routes={routes.homeRoutes} />
      </Navbar>
    );
  }
}

export default HomeNavBar;
