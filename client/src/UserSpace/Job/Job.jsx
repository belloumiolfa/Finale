import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

//import components
import Card from "../../components/Card/Card";

//import services
import UserServices from "../../Services/UserServices";
import ProfileServices from "../../Services/ProfileServices";
import JobServices from "../../Services/JobServices";

/***************************************************************************************** */

export default class Job extends Component {
  constructor(props) {
    super(props);

    this.state = {
      job: {},
      user: {},
      profile: {}
    };
  }

  componentDidMount = () => {
    JobServices.getJobById(this.props.match.params.job).then(res => {
      this.setState({ job: res.data });
      UserServices.getUserByID(res.data.creator).then(res => {
        this.setState({ user: res.data });
      });
      ProfileServices.getProfileByUserId(res.data.creator).then(res => {
        this.setState({ profile: res.data });
      });
    });
  };
  /************************************************************************************** */
  render() {
    const { job, user, profile } = this.state;
    console.log(job);
    console.log(user);
    console.log(profile);

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={job.title1}
                category={job.title2}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <span> {JSON.stringify(job)} </span>
                    <span> {JSON.stringify(user)} </span>
                    <span> {JSON.stringify(profile)} </span>
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
