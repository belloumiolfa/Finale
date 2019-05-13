import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

//import routing dependencis
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { ConfirmAction } from "../Redux/Actions/AuthAction";
class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null
    };
  }
  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };

  componentDidMount() {
    this.props.ConfirmAction(this.props.match.params.token);
  }

  render() {
    return (
      <div className="container">
        <Grid fluid>
          {" "}
          <div>
            <h2>Thank you to verify your account </h2>
            <span>
              You can get your account <Link to="/user/profile">Account</Link>
            </span>
          </div>
          <small className="form-text text-muted">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </Grid>
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
  { ConfirmAction }
)(withRouter(Confirm));
