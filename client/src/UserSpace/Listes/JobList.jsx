import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Moment from "react-moment";

//import routing dependencis
import { withRouter, Link } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import {
  GetUserJobsAction,
  PubliateJobAction,
  FinishJobAction,
  DeleteJobAction,
  SaveJobAction,
  RemoveJobAction,
  GetPubliatedJobsAction
} from "../../Redux/Actions/JobAction";

//import components
import Card from "components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton";

//import variables
import { thArray } from "variables/Variables.jsx";
import Search from "UserSpace/Job/Search/Search";
/************************************************************************************************* */
class JobList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      user: {}
    };
  }
  /************************************************************************************************* */
  getJobs = () => {
    const user = this.state.user;

    if (user.category !== "freelance" && user.category !== "admin") {
      this.props.GetUserJobsAction();
    } else {
      //get all job publiated
      this.props.GetPubliatedJobsAction();
    }
  };
  /************************************************************************************************* */
  componentDidMount = () => {
    const user = this.props.Auth.user;

    this.setState({ user: user });
    this.getJobs();
  };
  /************************************************************************************************* */
  componentWillReceiveProps(nextProps) {
    if (nextProps.Job.jobs) {
      this.setState({ jobs: nextProps.Job.jobs });
    }
    /* if (nextProps.Alert) {
      this.getJobs();
    }*/
  }
  /************************************************************************************************ */
  handlePubliate = job => {
    this.props.PubliateJobAction(job);
  };
  handleFinish = job => {
    this.props.FinishJobAction(job);
  };
  handleUpdate = job => {};

  handleDelete = job => {
    this.props.DeleteJobAction(job);
  };
  handleSave = job => {
    this.props.SaveJobAction(job);
  };
  handleRemove = job => {
    this.props.RemoveJobAction(job);
  };
  handleWorkSpace = job => {};
  /************************************************************************************************** */
  render() {
    const { jobs, user } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Search />
            </Col>
            <Col md={12}>
              <Card
                title="Jobs in your archive"
                category={`You can find all jobs that you add it ...`}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Button
                      bsStyle="info"
                      simple
                      pullRight
                      onClick={() => {
                        this.getJobs();
                      }}
                    >
                      Get all
                    </Button>
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map((job, key) => {
                          return (
                            <tr key={key}>
                              <td>{job.title1}</td>
                              <td>{job.salary}</td>
                              <td>{job.region}</td>
                              <td>{job.schedule}</td>
                              <td>
                                <Link to={`/user/job/${job._id}`}>Details</Link>
                              </td>
                              <td>
                                {job.publiate === "true" ? (
                                  <td>
                                    <Moment format="YYYY/MM/DD">
                                      {job.publication}
                                    </Moment>
                                  </td>
                                ) : (
                                  <td>
                                    {user.category !== "freelance" &&
                                      user.category !== "admin" && (
                                        <Button
                                          bsStyle="dark"
                                          simple
                                          pullLeft
                                          type="reset"
                                          onClick={() =>
                                            this.handlePubliate(job._id)
                                          }
                                        >
                                          {/**publiate it  */}
                                          <i className="pe-7s-share" />
                                        </Button>
                                      )}
                                  </td>
                                )}
                              </td>
                              <td>
                                {job.finish === "true" ? (
                                  <td>Finished</td>
                                ) : (
                                  <td>
                                    {user.category !== "freelance" &&
                                      user.category !== "admin" && (
                                        <div>
                                          <Button
                                            bsStyle="dark"
                                            simple
                                            pullLeft
                                            onClick={() =>
                                              this.handleFinish(job._id)
                                            }
                                          >
                                            {/**finish */}
                                            <i className="pe-7s-check" />
                                          </Button>
                                          {/**update */}
                                          <Button
                                            bsStyle="dark"
                                            simple
                                            pullLeft
                                            onClick={() =>
                                              this.handleUpdate(job._id)
                                            }
                                          >
                                            <i className="pe-7s-tools" />
                                          </Button>
                                          {/**create workspace */}
                                          <Button
                                            bsStyle="dark"
                                            simple
                                            pullLeft
                                            onClick={() =>
                                              this.handleWorkSpace(job._id)
                                            }
                                          >
                                            <i className="pe-7s-expand1" />
                                          </Button>
                                        </div>
                                      )}
                                  </td>
                                )}
                              </td>
                              {user.category !== "freelance" &&
                                user.category !== "admin" && (
                                  <td>
                                    {/**delete */}
                                    <Button
                                      bsStyle="dark"
                                      simple
                                      pullRight
                                      onClick={() => this.handleDelete(job._id)}
                                    >
                                      <i className="pe-7s-trash" />
                                    </Button>
                                  </td>
                                )}

                              {user.category === "freelance" && (
                                <td>
                                  {job.finish === "false" && (
                                    <div>
                                      <Button
                                        bsStyle="dark"
                                        simple
                                        pullRight
                                        onClick={() =>
                                          this.handleRemove(job._id)
                                        }
                                      >
                                        <i className="pe-7s-scissors" />
                                      </Button>

                                      <Button
                                        bsStyle="dark"
                                        simple
                                        pullRight
                                        onClick={() => this.handleSave(job._id)}
                                      >
                                        <i className="pe-7s-star" />
                                      </Button>

                                      <Button
                                        bsStyle="info"
                                        simple
                                        pullRight
                                        onClick={() =>
                                          this.handlePostulate(job._id)
                                        }
                                      >
                                        Postuler
                                      </Button>
                                    </div>
                                  )}
                                </td>
                              )}
                              {user.category === "admin" && (
                                <td>
                                  {/**delete */}
                                  <Button
                                    bsStyle="dark"
                                    simple
                                    pullRight
                                    onClick={() => this.handleDelete(job._id)}
                                  >
                                    <i className="pe-7s-trash" />
                                  </Button>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
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
  Job: state.Job
});

//map actions and state
export default connect(
  mapStateToProps,
  {
    GetUserJobsAction,
    PubliateJobAction,
    FinishJobAction,
    DeleteJobAction,
    SaveJobAction,
    RemoveJobAction,
    GetPubliatedJobsAction
  }
)(withRouter(JobList));
