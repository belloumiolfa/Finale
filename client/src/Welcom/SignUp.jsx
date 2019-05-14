import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

//import routing dependencis
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";
/**************************************************************************************************** */
class SignUp extends Component {
  componentDidMount() {
    if (this.props.Auth.isAuthenticated) {
      this.props.history.push("/user/profile");
    }
  }
  render() {
    return (
      <div className="container wrapper">
        <Grid fluid>
          <div className="title">
            <h2>Sign Up</h2>
            <span>
              If you already have an account please{" "}
              <Link to="/home/sign-in" className="custumLink">
                sign in
              </Link>
              . Otherwise, create a new account.
            </span>
          </div>
          <small className="form-text text-muted">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
          <hr size="4px" width="100%" />{" "}
          <Row className="">
            <Col md="4" sm="12">
              <Link to="/home/sign-up-form/client">
                <img
                  className="rounded-circle border border-white pic"
                  src=""
                  alt=""
                />
                <div>
                  <span>Client</span>
                </div>
              </Link>
            </Col>
            <Col md="4" sm="12">
              <Link to="/home/sign-up-form/association">
                <img
                  className="rounded-circle border border-white pic"
                  src=""
                  alt=""
                />
                <div>
                  <span>Association</span>
                </div>
              </Link>
            </Col>
            <Col md="4" sm="12">
              <Link to="/home/sign-up-form/company">
                <img
                  className="rounded-circle border border-white pic"
                  src=""
                  alt=""
                />
                <div>
                  <span>Company</span>
                </div>
              </Link>
            </Col>
          </Row>
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
  {}
)(withRouter(SignUp));
