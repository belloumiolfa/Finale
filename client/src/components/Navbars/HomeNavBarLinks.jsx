import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
//import routing dependencis
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { SignOutAction } from "../../Redux/Actions/AuthAction";
import { clearCurrentProfile } from "../../Redux/Actions/ProfileAction";

/************************************************************************************** */
class HomeNavBarLinks extends Component {
  onSignOut = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.SignOutAction();
  };
  /************************************************************************************** */
  handleSignIn = e => {
    e.preventDefault();
    this.props.history.push("/home/sign-in");
  };
  /************************************************************************************** */

  handleSignUP = e => {
    e.preventDefault();
    this.props.history.push("/home/sign-up");
  };
  /************************************************************************************** */

  handleGetAccount = e => {
    e.preventDefault();
    this.props.history.push("/user/account");
  };
  /************************************************************************************** */

  render() {
    const { isAuthenticated } = this.props.Auth;

    return (
      <div>
        {!isAuthenticated ? (
          <Nav pullLeft>
            <NavItem eventKey={1} onClick={this.handleSignIn}>
              Sign In
            </NavItem>

            <NavItem eventKey={2} onClick={this.handleSignUP}>
              Sign Up
            </NavItem>
          </Nav>
        ) : (
          <Nav pullLeft>
            <NavItem eventKey={3} onClick={this.handleGetAccount}>
              Account
            </NavItem>
            <NavItem eventKey={4} onClick={this.onSignOut}>
              Sign Out
            </NavItem>
          </Nav>
        )}
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
)(withRouter(HomeNavBarLinks));
