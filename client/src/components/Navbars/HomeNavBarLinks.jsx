import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class HomeNavBarLinks extends Component {
  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav pullLeft>
          <NavItem eventKey={1} href="/home/sign-in">
            Sign in
          </NavItem>

          <NavItem eventKey={2} href="/home/sign-up">
            Sign Up
          </NavItem>
        </Nav>

        <Nav pullRight>
          <NavItem eventKey={3} href="#">
            Account
          </NavItem>

          <NavItem eventKey={4} href="#">
            Sign out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default HomeNavBarLinks;
