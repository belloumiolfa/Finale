import React, { Component } from "react";
import { Grid } from "react-bootstrap";

//import components
import { Card } from "../components/Card/Card.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
//import routing dependencis
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { getProfilesByUserIdAction } from "../Redux/Actions/ProfileAction";
//import services
import UserServices from "Services/UserServices";
/************************************************************************************************ */
class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      profile: {},
      user: {}
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
    UserServices.getUserByID(this.props.match.params.id).then(res => {
      this.setState({ user: res.data });
    });
    this.props.getProfilesByUserIdAction(this.props.match.params.id);
  };

  /*************************************************************************************************** */
  render() {
    const { user, profile, errors } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          {profile ? (
            <div>
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
                    {profile.bio && <span>{profile.bio}</span>}
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
              <Card
                title={user.userName}
                category={`${user.firstName} ${user.lastName}`}
                content={
                  <div>
                    <span> {JSON.stringify(profile)} </span>
                    <br />
                    <span> {JSON.stringify(user)} </span>
                  </div>
                }
              />
            </div>
          ) : (
            <h1>{errors.noprofile}</h1>
          )}
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
  { getProfilesByUserIdAction }
)(withRouter(Account));
