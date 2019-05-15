import React, { Component } from "react";
import { Grid } from "react-bootstrap";

//immport redux dependencies
import { connect } from "react-redux";

//import actions
import { getProfilesAction } from "../../Redux/Actions/ProfileAction";

//import components
import Spinners from "../../components/Spinner/Spinners";
import Icons from "../../components/Icons";

/********************************************************************************** */
class CompanyList extends Component {
  componentDidMount() {
    this.props.getProfilesAction("company");
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinners />;
    } else {
      if (profiles.length > 0) {
        profileItems = <Icons profiles={profiles} title="Company Profiles" />;
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="content">
        <Grid fluid>{profileItems} </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.Profile
});

export default connect(
  mapStateToProps,
  { getProfilesAction }
)(CompanyList);
