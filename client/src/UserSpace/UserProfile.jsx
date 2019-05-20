import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

//import routing dependencis
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import {
  CurrentProfileAction,
  createProfileAction,
  updateUserAction
} from "../Redux/Actions/ProfileAction";

//import components
import { Card } from "../components/Card/Card.jsx";
import { FormInputs } from "../components/FormInputs/FormInputs.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import Spinners from "../components/Spinner/Spinners";
import avatar from "assets/img/faces/face-3.jpg";
import UserServices from "Services/UserServices";
import AddExperience from "../UserSpace/AddExperience";
import AddEducation from "../UserSpace/AddEducation";
import ListEduExp from "./Listes/ListEduExp";
/**************************************************************************************************** */
class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      disabled: true,
      profile: {},
      user: {},
      social: {}
    };
  }
  /*************************************************************************************************** */

  componentWillReceiveProps(nextProps) {
    if (nextProps.Alert) {
      this.setState({ errors: nextProps.Alert });
    }
    if (nextProps.Profile) {
      this.setState({ profile: nextProps.Profile.profile });
    }
  }
  /*************************************************************************************************** */

  componentDidMount = () => {
    UserServices.getCurrentUser().then(res => {
      this.setState({ user: res.data.user });
    });
    this.props.CurrentProfileAction();

    this.setState({
      profile: this.props.Profile.profile
    });
  };
  /*************************************************************************************************** */

  handleChangeProfile = e => {
    this.setState({
      profile: { ...this.state.profile, [e.target.name]: e.target.value }
    });
  };
  /*************************************************************************************************** */

  handleChangeUser = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  };
  /*************************************************************************************************** */

  handleSubmit = e => {
    e.preventDefault();

    //create or update profile
    this.props.createProfileAction(this.state.profile);

    //update user informations
    this.props.updateUserAction(this.state.user);
  };
  /*************************************************************************************************** */
  render() {
    const { errors, user, profile } = this.state;
    const { loading } = this.props.Profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinners />;
    }
    // Check if signed in user has profile data
    else if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <Card
          title="Edit Profile"
          content={
            <form onSubmit={this.handleSubmit}>
              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                properties={[
                  {
                    label: "Username",
                    type: "text",
                    bsClass: "form-control",
                    defaultValue: user.userName,
                    placeholder: "User Name",
                    name: "userName",
                    onChange: this.handleChangeUser
                  },

                  {
                    label: "Email address",
                    type: "email",
                    bsClass: "form-control",
                    placeholder: "Email",
                    name: "email",
                    defaultValue: profile.email,
                    onChange: this.handleChangeProfile
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
                  {errors.status && (
                    <div style={{ color: "red" }}>{errors.status}</div>
                  )}
                </Col>
                <Col md={4}>
                  {errors.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </Col>
              </Row>
              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                properties={[
                  {
                    label: "First Name",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "First Name",
                    defaultValue: user.firstName,
                    name: "firstName",
                    onChange: this.handleChangeUser
                  },
                  {
                    label: "Last Name",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Last Name",
                    name: "lastName",
                    value: user.lastName,
                    onChange: this.handleChangeUser
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                properties={[
                  {
                    label: "Adress",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Home Adress",
                    defaultValue: profile.location,
                    name: "location",
                    onChange: this.handleChangeProfile
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-6", "col-md-6"]}
                properties={[
                  {
                    label: "Birthday",
                    type: "date",
                    bsClass: "form-control",
                    placeholder: "Birthday",
                    defaultValue: user.birthday,
                    name: "birthday",
                    onChange: this.handleChangeUser
                  },
                  {
                    label: "Sex ( Famel / Man )",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Sex (Famel / Man )",
                    defaultValue: user.sex,
                    name: "sex",
                    onChange: this.handleChangeUser
                  }
                ]}
              />
              <FormInputs
                ncols={["col-md-12"]}
                properties={[
                  {
                    label: "Web site",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Web site",
                    defaultValue: profile.website,
                    name: "website",
                    onChange: this.handleChangeProfile
                  }
                ]}
              />
              {errors.website && (
                <div style={{ color: "red" }}>{errors.website}</div>
              )}

              <h6>Social </h6>
              <FormInputs
                ncols={["col-md-3", "col-md-3", "col-md-3", "col-md-3"]}
                properties={[
                  {
                    label: <i class="fa fa-google-plus-square" />,
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "google",
                    name: "google",
                    defaultValue: profile.google,
                    onChange: this.handleChangeProfile
                  },
                  {
                    label: <i class="fa fa-linkedin" />,
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "linkedin",
                    name: "linkedin",
                    defaultValue: profile.linkedin,
                    onChange: this.handleChangeProfile
                  },
                  {
                    label: <i className="fa fa-twitter" />,
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "twitter",
                    name: "twitter",
                    defaultValue: profile.twitter,
                    onChange: this.handleChangeProfile
                  },
                  {
                    label: <i className="fa fa-facebook-square" />,
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "Facebook",
                    name: "facebook",
                    defaultValue: profile.facebook,
                    onChange: this.handleChangeProfile
                  }
                ]}
              />
              <Row>
                <Col md={3}>
                  {errors.google && (
                    <div style={{ color: "red" }}>{errors.google}</div>
                  )}
                </Col>
                <Col md={3}>
                  {errors.linkedin && (
                    <div style={{ color: "red" }}>{errors.linkedin}</div>
                  )}
                </Col>
                <Col md={3}>
                  {errors.twitter && (
                    <div style={{ color: "red" }}>{errors.twitter}</div>
                  )}
                </Col>
                <Col md={3}>
                  {errors.facebook && (
                    <div style={{ color: "red" }}>{errors.facebook}</div>
                  )}
                </Col>
              </Row>
              {user.category === "client" && (
                <div>
                  <h6>Client information</h6>
                  <FormInputs
                    ncols={["col-md-4", "col-md-4", "col-md-4"]}
                    properties={[
                      {
                        label: "Email",
                        type: "email",
                        bsClass: "form-control",
                        placeholder: "Email",
                        defaultValue: user.email,
                        name: "email"
                      },
                      {
                        label: "Cin",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Cin",
                        defaultValue: user.cin,
                        name: "cin",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Phone",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "ZIP Code",
                        defaultValue: user.phone,
                        name: "phone",
                        onChange: this.handleChangeUser
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
                        label: "Country",
                        type: "country",
                        bsClass: "form-control",
                        placeholder: "Country",
                        defaultValue: user.country,
                        name: "country"
                      },
                      {
                        label: "City",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "City",
                        defaultValue: user.city,
                        name: "city",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Zip",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "ZIP Code",
                        defaultValue: user.zip,
                        name: "zip",
                        onChange: this.handleChangeUser
                      }
                    ]}
                  />
                </div>
              )}
              {user.category === "association" && (
                <div>
                  <h6>Association informations</h6>
                  <FormInputs
                    ncols={["col-md-4", "col-md-4", "col-md-4"]}
                    properties={[
                      {
                        label: "Association name",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Association name",
                        defaultValue: user.nameAssociation,
                        name: "nameAssociation",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Domaine",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Domaine",
                        defaultValue: user.domaine,
                        name: "domaine",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Activity",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Activity",
                        defaultValue: user.activity,
                        name: "activity",
                        onChange: this.handleChangeUser
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
                        label: "Email",
                        type: "email",
                        bsClass: "form-control",
                        placeholder: "Email",
                        defaultValue: user.email,
                        name: "email",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Phone",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Phone",
                        defaultValue: user.phone,
                        name: "phone",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Fax",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Fax",
                        defaultValue: user.fax,
                        name: "fax",
                        onChange: this.handleChangeUser
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
                        label: "Web site",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Web site",
                        defaultValue: user.website,
                        name: "website",
                        onChange: this.handleChangeUser
                      }
                    ]}
                  />
                  {errors.website && (
                    <div style={{ color: "red" }}>{errors.website}</div>
                  )}

                  <FormInputs
                    ncols={["col-md-4", "col-md-4", "col-md-4"]}
                    properties={[
                      {
                        label: "Country",
                        type: "country",
                        bsClass: "form-control",
                        placeholder: "Country",
                        defaultValue: user.country,
                        name: "country"
                      },
                      {
                        label: "City",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "City",
                        defaultValue: user.city,
                        name: "city",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Zip",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "ZIP Code",
                        defaultValue: user.zip,
                        name: "zip",
                        onChange: this.handleChangeUser
                      }
                    ]}
                  />
                </div>
              )}
              {user.category === "company" && (
                <div>
                  <h6>Company informations</h6>
                  <FormInputs
                    ncols={["col-md-4", "col-md-4", "col-md-4"]}
                    properties={[
                      {
                        label: "Company name",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Company name",
                        defaultValue: user.nameCompany,
                        name: "nameCompany",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Tax",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Tax",
                        defaultValue: user.tax,
                        name: "tax",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Activity",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Activity",
                        defaultValue: user.activity,
                        name: "activity",
                        onChange: this.handleChangeUser
                      }
                    ]}
                  />
                  <Row>
                    <Col md={4}>
                      {errors.nameCompany && (
                        <div style={{ color: "red" }}>{errors.nameCompany}</div>
                      )}
                    </Col>
                    <Col md={4}>
                      {errors.tax && (
                        <div style={{ color: "red" }}>{errors.tax}</div>
                      )}
                    </Col>
                    <Col md={4}>
                      {errors.activity && (
                        <div style={{ color: "red" }}>{errors.activity}</div>
                      )}
                    </Col>
                  </Row>
                  <FormInputs
                    ncols={["col-md-4", "col-md-4", "col-md-4"]}
                    properties={[
                      {
                        label: "Email",
                        type: "email",
                        bsClass: "form-control",
                        placeholder: "Email",
                        defaultValue: user.email,
                        name: "email",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Phone",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Phone",
                        defaultValue: user.phone,
                        name: "phone",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Fax",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Fax",
                        defaultValue: user.fax,
                        name: "fax",
                        onChange: this.handleChangeUser
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
                        label: "Web site",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Web site",
                        defaultValue: user.website,
                        name: "website",
                        onChange: this.handleChangeUser
                      }
                    ]}
                  />

                  {errors.website && (
                    <div style={{ color: "red" }}>{errors.website}</div>
                  )}

                  <FormInputs
                    ncols={["col-md-4", "col-md-4", "col-md-4"]}
                    properties={[
                      {
                        label: "Country",
                        type: "country",
                        bsClass: "form-control",
                        placeholder: "Country",
                        defaultValue: user.country,
                        name: "country"
                      },
                      {
                        label: "City",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "City",
                        defaultValue: user.city,
                        name: "city",
                        onChange: this.handleChangeUser
                      },
                      {
                        label: "Zip",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "ZIP Code",
                        defaultValue: user.zip,
                        name: "zip",
                        onChange: this.handleChangeUser
                      }
                    ]}
                  />
                </div>
              )}

              {user.category === "freelance" && (
                <div>
                  <h6>Freelance information</h6>
                  <ListEduExp
                    title="Experience"
                    attribute={["title", "company", "years"]}
                    value={profile.experience}
                  />
                  <AddExperience />
                  <ListEduExp
                    title="Education"
                    attribute={["school", "degree", "field of study"]}
                    value={profile.education}
                  />
                  <AddEducation />
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Gi Hub User name",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Web site",
                        defaultValue: profile.githubusername,
                        name: "githubusername",
                        onChange: this.handleChangeProfile
                      }
                    ]}
                  />
                </div>
              )}

              <Row>
                <Col md={12}>
                  <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>About Me</ControlLabel>
                    <FormControl
                      rows="5"
                      componentClass="textarea"
                      bsClass="form-control"
                      placeholder="Here can be your description"
                      defaultValue={profile.bio}
                      name="bio"
                      onChange={this.handleChangeProfile}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button bsStyle="info" pullRight fill type="submit">
                Update Profile
              </Button>

              <div className="clearfix" />
            </form>
          }
        />
      );
      //}
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {errors.noprofile && (
              <span>{errors.noprofile} - you can create one </span>
            )}
            <Col md={8}>{dashboardContent}</Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={user.avatar}
                name={
                  user.firstName &&
                  user.lastName &&
                  `${user.firstName} ${user.lastName}`
                }
                userName={user.userName}
                description={
                  <span>
                    ({user.category})
                    <br />
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                    <Button simple>
                      <i class="fa fa-linkedin" />
                    </Button>
                  </div>
                }
              />
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
  Alert: state.Alert,
  Profile: state.Profile
});

//map actions and state
export default connect(
  mapStateToProps,
  { CurrentProfileAction, createProfileAction, updateUserAction }
)(withRouter(UserProfile));
