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
import { getAccount } from "../Redux/Actions/ProfileAction";

//import components
import { Card } from "../components/Card/Card.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      handleName: ""
    };
  }

  /*************************************************************************************************** */

  componentWillReceiveProps(nextProps) {
    if (nextProps.Alert) {
      this.setState({ errors: nextProps.Alert });
    }
    if (nextProps.Profile) {
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
    }
  }
  /*************************************************************************************************** */

  componentDidMount = () => {
    this.props.getAccount(this.props.match.params.id);
    //get user by profile.user
  };

  /*************************************************************************************************** */
  render() {
    const profile = this.props.Profile.account;
    const handleName = this.state.handleName;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <h1>{handleName}</h1>
            </Col>
            <Card
              title={`username`}
              category={` firstname lastname profile `}
              content={<h1>hello</h1>}
            />
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
  { getAccount }
)(withRouter(Account));
