import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

//import routing dependencis
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { SignInAction } from "../Redux/Actions/AuthAction";

//import components
import { FormInputs } from "../components/FormInputs/FormInputs";
import Button from "../components/CustomButton/CustomButton";
/******************************************************************************************************** */
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      errors: {}
    };
  }
  /*************************************** handleChange ************************************************* */
  handleChange = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  };
  /*************************************** handleSubmit ************************************************* */
  handleSubmit = e => {
    e.preventDefault();

    //new user
    var newUser = this.state.user;
    this.props.SignInAction(newUser);
  };
  /************************************* componentWillReceiveProps ************************************* */

  componentWillReceiveProps(nextProps) {
    if (nextProps.Alert) {
      this.setState({ errors: nextProps.Alert });
    }
    if (nextProps.Auth.isAuthenticated) {
      const id = this.props.Auth.user._id;
      this.props.history.push(`/user/profile`);
    }
  }

  componentDidMount() {
    if (this.props.Auth.isAuthenticated) {
      const id = this.props.Auth.user._id;
      this.props.history.push(`/user/profile`);
    }
  }
  /***************************************************************************************************** */
  render() {
    const { user, errors } = this.state;

    return (
      <div className="container">
        <Grid fluid>
          <div className="title">
            <h2>Sign In</h2>
            <span>
              If you haven't an account please{" "}
              <Link to="/home/sign-up">Sign Up</Link>. Otherwise, get your
              account.
            </span>
          </div>
          <small className="form-text text-muted">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
          <Row className="container">
            <Col md={3} />
            <Col md={6} m-auto="true">
              <form onSubmit={this.handleSubmit}>
                <FormInputs
                  ncols={["col-md-12"]}
                  properties={[
                    {
                      label: "Email ",
                      type: "email",
                      name: "email",
                      value: user.email,
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Email "
                    }
                  ]}
                />
                {errors.email && (
                  <div style={{ color: "red" }}>{errors.email}</div>
                )}
                <FormInputs
                  ncols={["col-md-12"]}
                  properties={[
                    {
                      label: "Password ",
                      type: "password",
                      name: "password",
                      value: user.password,
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "Password "
                    }
                  ]}
                />
                {errors.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
                <span>
                  <Link to="/forgetpassword">Forget Password?</Link>
                </span>

                <div>
                  <Button bsStyle="info" pullRight fill type="submit">
                    Sign In
                  </Button>
                  <span>
                    <hr size="4px" width="100%" />
                    Have't Any Account {"  "}
                    <Link to="/home/sign-up">Create An Account</Link>
                  </span>
                </div>
              </form>
            </Col>
            <Col md={3} />
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
  { SignInAction }
)(withRouter(SignIn));
