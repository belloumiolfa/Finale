import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import NotificationSystem from "react-notification-system";

//import routing dependencis
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { ConfirmAction } from "../Redux/Actions/AuthAction";

import { style } from "../variables/Variables";

/************************************************************************************************* */
class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null
    };
  }

  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
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
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>TrustiT.WORK</b> - Thank you for confirmattion.
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 15
    });
    const decoded = jwt_decode(this.props.match.params.token);

    this.props.ConfirmAction(decoded.user._id, this.props.history);
  }

  render() {
    return (
      <div className="container">
        <Grid fluid>
          <NotificationSystem ref="notificationSystem" style={style} />

          <div>
            <h2>Thank you for verifying your account </h2>
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
