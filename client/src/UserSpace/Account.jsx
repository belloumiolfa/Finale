import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

//import components
import { Card } from "../components/Card/Card.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";

//import services
import UserServices from "Services/UserServices";
import ProfileServices from "Services/ProfileServices";
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

  /*
      const profile = nextProps.Profile.account;
      var name = "";
      //------------------------------------------------------------------//
      if (
        profile.user.category === "client" ||
        profile.user.category === "freelance"
      ) {
        if (profile.user.firstName) name = profile.user.firstName;
        else name = "";
        if (profile.user.lastName) name = name + " " + profile.user.lastName;
        else name = "";
      }

      if (profile.user.category === "company") name = profile.user.nameCompany;

      if (profile.user.category === "association")
        name = profile.user.nameAssociation;
      //------------------------------------------------------------------//

      this.setState({ handleName: name });*/

  /*************************************************************************************************** */

  componentDidMount = () => {
    UserServices.getUserByID(this.props.match.params.id).then(res => {
      this.setState({ user: res.data });
    });
    ProfileServices.getProfileByUserId(this.props.match.params.id).then(res => {
      this.setState({ profile: res.data });
    });
  };

  /*************************************************************************************************** */
  render() {
    const { user, profile } = this.state;

    return (
      <div className="content">
        <Grid fluid>
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
        </Grid>
      </div>
    );
  }
}
export default Account;
