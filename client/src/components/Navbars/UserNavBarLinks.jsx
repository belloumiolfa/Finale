import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

//import routing dependencis
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { SignOutAction } from "../../Redux/Actions/AuthAction";
import { clearCurrentProfile } from "../../Redux/Actions/ProfileAction";
/************************************************************************************** */

class UserNavBarLinks extends Component {
  onSignOut = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.SignOutAction(this.props.history);
  };
  /************************************************************************************** */

  handleGetAccount = e => {
    e.preventDefault();
    this.props.history.push("/user/account");
  };
  /************************************************************************************** */

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
        <Nav>
          <NavItem eventKey={1}>
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3}>
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={3} onClick={this.handleGetAccount}>
            Account
          </NavItem>

          <NavItem eventKey={3} onClick={this.onSignOut}>
            Sign out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

//map store's state to component's props
//authentification comes from root reducer the attribut that content AuthReducer
const mapStateToProps = state => ({
  Auth: state.Authentification,
  Alert: state.Alert
});

//map actions and state
export default connect(
  mapStateToProps,
  { SignOutAction, clearCurrentProfile }
)(withRouter(UserNavBarLinks));
