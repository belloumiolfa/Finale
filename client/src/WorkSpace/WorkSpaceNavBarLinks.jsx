import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

//import routing dependencis
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
/************************************************************************************** */

class WorkSpaceNavBarLinks extends Component {
  onSignOut = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.SignOutAction();
  };
  /************************************************************************************** */

  handleGetAccount = e => {
    e.preventDefault();
    const id = this.props.Auth.user._id;
    this.props.history.push(`/user/account/${id}`);
  };
  /************************************************************************************** */

  render() {
    const invitation = (
      <div>
        <span>Invitations</span>
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Invitations</p>
      </div>
    );
    const postulation = (
      <div>
        <span>Postulations</span>
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Postulations</p>
      </div>
    );
    return (
      <div>
        <Nav pullRight>
          <NavDropdown
            eventKey={2}
            title={invitation}
            noCaret
            id="basic-nav-dropdown"
          >
            {/**get list invitations */}
            <MenuItem eventKey={2.1}>Invitation 1</MenuItem>
            <MenuItem eventKey={2.2}>Invitation 2</MenuItem>
            <MenuItem eventKey={2.3}>Invitation 3</MenuItem>
            <MenuItem eventKey={2.4}>Invitation 4</MenuItem>
            <MenuItem eventKey={2.5}>Another Invitations</MenuItem>
          </NavDropdown>
          <NavDropdown
            eventKey={2}
            title={postulation}
            noCaret
            id="basic-nav-dropdown"
          >
            {/**get list postulations */}

            <MenuItem eventKey={2.1}>Postulation 1</MenuItem>
            <MenuItem eventKey={2.2}>Postulation 2</MenuItem>
            <MenuItem eventKey={2.3}>Postulation 3</MenuItem>
            <MenuItem eventKey={2.4}>Postulation 4</MenuItem>
            <MenuItem eventKey={2.5}>Another Postulations</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={3} onClick={this.handleGetAccount}>
            Start
          </NavItem>

          <NavItem eventKey={3} onClick={this.onSignOut}>
            Finish
          </NavItem>
          <NavItem eventKey={3} onClick={this.onSignOut}>
            Deadline
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
  {}
)(withRouter(WorkSpaceNavBarLinks));
