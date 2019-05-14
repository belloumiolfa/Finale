import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

//import routing dependencis
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { SignUpAction } from "../Redux/Actions/AuthAction";

//import components
import { FormInputs } from "../components/FormInputs/FormInputs";
import Button from "../components/CustomButton/CustomButton";
/******************************************************************************************************* */
class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.Auth.isAuthenticated) {
      this.props.history.push("/user/profile");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.Alert) {
      this.setState({ errors: nextProps.Alert });
    }
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
    var newUser = {
      ...this.state.user,
      category: this.props.match.params.category
    };
    this.props.SignUpAction(newUser, this.props.history);
  };

  /**************************************************************************************************** */
  render() {
    let category = this.props.match.params.category;
    const { user, errors } = this.state;
    return (
      <div className="container">
        <Grid fluid>
          <div>
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
          <Row className="container">
            <Col md={2} />
            <Col md={8} m-auto>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <h6>Personal informations </h6>
                  <hr size="4px" width="100%" />{" "}
                </div>
                <FormInputs
                  ncols={["col-md-4", "col-md-4", "col-md-4"]}
                  properties={[
                    {
                      label: "User Name ",
                      type: "text",
                      name: "userName",
                      value: user.userName,
                      onChange: this.handleChange,
                      bsClass: "form-control",
                      placeholder: "User Name "
                    },
                    {
                      label: "Password",
                      name: "password",
                      value: user.password,
                      onChange: this.handleChange,
                      type: "password",
                      bsClass: "form-control",
                      placeholder: "Password"
                    },
                    {
                      label: "Confirm password",
                      name: "password2",
                      value: user.password2,
                      onChange: this.handleChange,
                      type: "password",
                      bsClass: "form-control",
                      placeholder: "Confirm password"
                    }
                  ]}
                />
                <Row>
                  <Col md={4}>
                    {errors.userName && (
                      <div style={{ color: "red" }}>{errors.userName}</div>
                    )}
                  </Col>
                  <Col md={4}>
                    {errors.password && (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    )}
                  </Col>
                  <Col md={4}>
                    {errors.password2 && (
                      <div style={{ color: "red" }}>{errors.password2}</div>
                    )}
                  </Col>
                </Row>
                <FormInputs
                  ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                  properties={[
                    {
                      label: "First Name  ",
                      type: "text",
                      name: "firstName",
                      value: user.firstName,
                      bsClass: "form-control",
                      placeholder: "First Name "
                    },
                    {
                      label: "Last Name",
                      name: "lastName",
                      value: user.lastName,
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Last Name"
                    },
                    {
                      label: "Birthday",
                      name: "birthday",
                      value: user.birthday,
                      type: "date",
                      bsClass: "form-control",
                      placeholder: "Birthday"
                    },
                    {
                      label: "Sex  ",
                      name: "sex",
                      value: user.sex,
                      type: "text",
                      bsClass: "form-control",
                      placeholder: " Sex( Famel / Man )"
                    }
                  ]}
                />
                {category === "client" && (
                  <div>
                    <div>
                      <h6>Client informations </h6>
                      <hr size="4px" width="100%" />{" "}
                    </div>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Email ",
                          type: "email",
                          name: "email",
                          value: user.email,
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Email "
                        },
                        {
                          label: "Cin",
                          name: "cin",
                          value: user.cin,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Cin"
                        },
                        {
                          label: "Phone",
                          name: "phone",
                          value: user.phone,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Phone"
                        }
                      ]}
                    />
                    <Row>
                      <Col md={4}>
                        {errors.email && (
                          <div style={{ color: "red" }}>{errors.email}</div>
                        )}
                      </Col>
                      <Col md={4}>
                        {errors.cin && (
                          <div style={{ color: "red" }}>{errors.cin}</div>
                        )}
                      </Col>
                      <Col md={4} />
                    </Row>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "City ",
                          type: "text",
                          name: "city",
                          value: user.city,
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "city "
                        },
                        {
                          label: "Country",
                          name: "country",
                          value: user.country,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "country"
                        },
                        {
                          label: "Zip",
                          name: "zip",
                          value: user.zip,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Zip"
                        }
                      ]}
                    />
                  </div>
                )}
                {category === "company" && (
                  <div>
                    <div>
                      <h6>Company informations </h6>
                      <hr size="4px" width="100%" />{" "}
                    </div>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Company ",
                          type: "text",
                          name: "nameCompany",
                          value: user.nameCompany,
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Name Company "
                        },
                        {
                          label: "Tax",
                          name: "tax",
                          value: user.tax,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Tax"
                        },
                        {
                          label: "Activity",
                          name: "activity",
                          value: user.activity,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Activity"
                        }
                      ]}
                    />
                    <Row>
                      <Col md={4}>
                        {errors.nameCompany && (
                          <div style={{ color: "red" }}>
                            {errors.nameCompany}
                          </div>
                        )}
                      </Col>
                      <Col md={4}>
                        {errors.tax && (
                          <div style={{ color: "red" }}>{errors.tax}</div>
                        )}
                      </Col>
                      <Col md={4} />
                    </Row>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Email ",
                          type: "email",
                          name: "email",
                          value: user.email,
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Email "
                        },
                        {
                          label: "Phone",
                          name: "phone",
                          value: user.phone,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Phone"
                        },
                        {
                          label: "Fax",
                          name: "fax",
                          value: user.fax,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Fax"
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
                          label: "Web Site  ",
                          type: "text",
                          name: "webSite",
                          value: user.webSite,
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Web Site "
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "City ",
                          type: "text",
                          name: "city",
                          value: user.city,
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "City "
                        },
                        {
                          label: "Country",
                          name: "country",
                          value: user.country,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country"
                        },
                        {
                          label: "Zip",
                          name: "zip",
                          value: user.zip,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Zip"
                        }
                      ]}
                    />
                  </div>
                )}
                {category === "association" && (
                  <div>
                    <div>
                      <h6>Association informations </h6>
                      <hr size="4px" width="100%" />{" "}
                    </div>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Association ",
                          type: "text",
                          name: "nameAssociation",
                          value: user.nameAssociation,
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Name Association "
                        },
                        {
                          label: "Domaine",
                          name: "domaine",
                          value: user.domaine,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Domaine"
                        },
                        {
                          label: "Activity",
                          name: "activity",
                          value: user.activity,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Activity"
                        }
                      ]}
                    />
                    <Row>
                      <Col md={4}>
                        {errors.nameAssociation && (
                          <div style={{ color: "red" }}>
                            {errors.nameAssociation}
                          </div>
                        )}
                      </Col>
                      <Col md={4}>
                        {errors.domaine && (
                          <div style={{ color: "red" }}>{errors.domaine}</div>
                        )}
                      </Col>
                      <Col md={4} />
                    </Row>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Email ",
                          type: "email",
                          name: "email",
                          value: user.email,
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Email "
                        },
                        {
                          label: "Phone",
                          name: "phone",
                          value: user.phone,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Phone"
                        },
                        {
                          label: "Fax",
                          name: "fax",
                          value: user.fax,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Fax"
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
                          label: "Web Site  ",
                          type: "text",
                          name: "webSite",
                          value: user.webSite,
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "Web Site "
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "City ",
                          type: "text",
                          name: "city",
                          value: user.city,
                          onChange: this.handleChange,
                          bsClass: "form-control",
                          placeholder: "City "
                        },
                        {
                          label: "Country",
                          name: "country",
                          value: user.country,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Country"
                        },
                        {
                          label: "Zip",
                          name: "zip",
                          value: user.zip,
                          onChange: this.handleChange,
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Zip"
                        }
                      ]}
                    />
                  </div>
                )}
                <Button bsStyle="info" pullRight fill type="submit">
                  Sign Up
                </Button>
                <Button bsStyle="info" pullLeft fill type="submit">
                  Reset
                </Button>
              </form>
            </Col>
            <Col md={2} />
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
  { SignUpAction }
)(withRouter(SignUpForm));
