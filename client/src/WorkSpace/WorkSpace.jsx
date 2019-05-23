import React, { Component } from "react";
import { Row, Col, Collapse, CardBody } from "reactstrap";
import {
  Grid,
  Table,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
//import routing dependencis
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions

//import components
import Card from "components/Card/Card";
import Button from "components/CustomButton/CustomButton";
import NavBarWorkSpace from "./NavBarWorkSpace";
import FormInputs from "../components/FormInputs/FormInputs";
import SelectInput from "../components/SelectInput/SelectInput";
import WorkSpaceServices from "Services/WorkSpaceServices";
import ProfileServices from "Services/ProfileServices";

/********************************************************************** */
export default class WorkSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      collapse2: false,
      collapse3: false,
      collapse4: false,

      toDo: {},
      post: {},
      comment: "",

      workSpace: {},
      profile: {},

      invitations: [],
      postulations: [],
      workers: []
    };
  }

  /************************************************************************************************ */
  componentDidMount = () => {
    //get work space by job id
    WorkSpaceServices.getWorkSpaceByJob(this.props.match.params.job).then(
      res => {
        this.setState({ workSpace: res.data });
        console.log(res.data);
      }
    );
    //get profile creator
    ProfileServices.getProfileByUserId(this.state.workSpace.creator).then(
      res => {
        this.setState({ profile: res.data });
        console.log(res.data);
      }
    );
    //get profile invitation
    //get profiles postulation
    //get profile workers
    //get todo list
    //get doing list
    //get done list
  };
  /************************************************************************************************* */
  getBrandText = () => {
    return this.state.workSpace.name;
  };
  /*************************************** Toggeles ************************************************ */
  //todo list
  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  };
  //done list
  toggle2 = () => {
    this.setState(state => ({ collapse2: !state.collapse2 }));
  };
  //add to do list
  toggle3 = () => {
    this.setState(state => ({ collapse3: !state.collapse3 }));
  };
  //add comment
  toggle4 = () => {
    this.setState(state => ({ collapse4: !state.collapse4 }));
  };
  /****************************************** Todo ************************************************ */

  handleChangeTodo = e => {
    this.setState({
      toDo: { ...this.state.toDo, [e.target.name]: e.target.value }
    });
  };
  handleSubmitTodo = e => {
    e.preventDefault();
    console.log(this.state.toDo);
  };
  /**************************************** Postes ************************************************ */
  handleChangePost = e => {
    this.setState({
      post: { ...this.state.post, [e.target.name]: e.target.value }
    });
  };
  handleChangePost = e => {
    e.preventDefault();
    console.log(this.state.post);
  };
  /**************************************** comment ************************************************ */
  handleChangeComment = e => {
    this.setState({
      post: { ...this.state.post, [e.target.name]: e.target.value }
    });
  };
  handleSubmitComment = e => {
    e.preventDefault();
    console.log(this.state.comment);
    //ad to post.comments array
  };
  /************************************************************************************************** */
  render() {
    const { toDo, post, comment, workSpace } = this.state;
    return (
      <div>
        <NavBarWorkSpace {...this.props} brandText={this.getBrandText()} />
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={6} xs={12}>
                <Card
                  title={
                    <span>
                      ToDo List
                      <i
                        className="pe-7s-angle-down-circle"
                        onClick={this.toggle}
                      />
                    </span>
                  }
                  category="Consult the todo list  added  by the administrator"
                  ctTableResponsive
                  ctTableFullWidth
                  ctTableUpgrade
                  content={
                    <Collapse isOpen={this.state.collapse}>
                      <CardBody>
                        <div className="content">
                          <Table striped hover>
                            <tbody>
                              <tr>
                                <td>
                                  Todo 1 (freelancer name)
                                  <Button bsStyle="dark" pullRight simple>
                                    Doing
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <Button bsStyle="info" simple onClick={this.toggle3}>
                            New
                          </Button>
                          <Collapse isOpen={this.state.collapse3}>
                            <CardBody>
                              <div className="content">
                                <form onSubmit={this.handleSubmitTodo}>
                                  <FormInputs
                                    ncols={["col-md-12"]}
                                    properties={[
                                      {
                                        label: "Title  ",
                                        type: "text",
                                        bsClass: "form-control",
                                        defaultValue: toDo.Title,
                                        placeholder: "Todo Title",
                                        name: "title",
                                        onChange: this.handleChangeTodo
                                      }
                                    ]}
                                  />
                                  <SelectInput
                                    options={[
                                      "freelance1",
                                      "freelance2",
                                      "freelance3",
                                      "freelance4"
                                    ]}
                                    properties={{
                                      label: "Worker",
                                      value: toDo.worker,
                                      name: "worker",
                                      onChange: this.handleChangeTodo
                                    }}
                                  />
                                  <Button simple pullRight type="submit">
                                    Save
                                  </Button>
                                </form>
                              </div>
                            </CardBody>
                          </Collapse>
                        </div>
                      </CardBody>
                    </Collapse>
                  }
                />
              </Col>

              <Col md={6} xs={12}>
                <Card
                  title={
                    <span>
                      Done List
                      <i
                        className="pe-7s-angle-down-circle"
                        onClick={this.toggle2}
                      />
                    </span>
                  }
                  category="Consult the done list "
                  ctTableResponsive
                  ctTableFullWidth
                  ctTableUpgrade
                  content={
                    <Collapse isOpen={this.state.collapse2}>
                      <CardBody>
                        <div className="content">
                          <Table striped hover>
                            <tbody>
                              <tr>
                                <td>Todo 1</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Collapse>
                  }
                />
              </Col>
              <Col md={12} xs={12}>
                <Card
                  title="Doing List"
                  category="Consult the doing list"
                  ctTableResponsive
                  ctTableFullWidth
                  ctTableUpgrade
                  content={
                    <div className="content">
                      <Table striped hover>
                        <tbody>
                          <tr>
                            <td>
                              Doing 1 (freelancer name)
                              <Button bsStyle="dark" pullRight simple>
                                Done
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <form onSubmit={this.handleSubmitPost}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel> Description </ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can you description the what are you doing  "
                            defaultValue={post.description}
                            name="description"
                            onChange={this.handleChangePost}
                          />
                        </FormGroup>
                        <Button
                          bsStyle="info"
                          pullRight
                          type="submit"
                          style={{ marginLeft: "10px" }}
                        >
                          Post
                        </Button>
                        <Button bsStyle="info" pullRight type="reset">
                          Cancel
                        </Button>
                      </form>
                      <div style={{ marginTop: "5px" }}>
                        <Table hover>
                          <tbody>
                            <tr>
                              <td>
                                <div>
                                  post 1 (freelancer name){" "}
                                  <Button bsStyle="dark" pullRight simple>
                                    X
                                  </Button>
                                </div>
                                <Table hover>
                                  <tbody>
                                    <tr>
                                      <td>
                                        comment 1 (freelancer name)
                                        <Button bsStyle="dark" pullRight simple>
                                          X
                                        </Button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                                <Button
                                  bsStyle="dark"
                                  pullLeft
                                  simple
                                  onClick={this.toggle4}
                                >
                                  Comment
                                </Button>
                                <Collapse isOpen={this.state.collapse4}>
                                  <FormInputs
                                    ncols={["col-md-12"]}
                                    properties={[
                                      {
                                        label: "",
                                        type: "text",
                                        bsClass: "form-control",
                                        defaultValue: Comment,
                                        placeholder: "Comment",
                                        name: "comment",
                                        onChange: this.handleChangeComment
                                      }
                                    ]}
                                  />
                                  <Button bsStyle="dark" pullRight>
                                    Comment
                                  </Button>
                                </Collapse>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
