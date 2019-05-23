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
import { withRouter, Link } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { CreateWorkSpaceAction } from "../Redux/Actions/WorkSpaceAction";
//import components
import Card from "components/Card/Card";
import Button from "components/CustomButton/CustomButton";
import FormInputs from "../components/FormInputs/FormInputs";
import SelectInput from "../components/SelectInput/SelectInput";

//import variables
/******************************************************************************************************** */
class AddWorkSpace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workSpace: {},
      errors: {}
    };
  }
  /************************************* componentWillReceiveProps ************************************* */

  componentWillReceiveProps(nextProps) {
    if (nextProps.Alert) {
      this.setState({ errors: nextProps.Alert });
    }
  }

  handleChange = e => {
    this.setState({
      workSpace: { ...this.state.workSpace, [e.target.name]: e.target.value }
    });
  };
  /*************************************************************************************************** */

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.workSpace);
    this.props.CreateWorkSpaceAction(
      this.props.match.params.job,
      this.state.workSpace,
      this.props.history
    );
    //this.props.history.push(`/user/workSpace`);
  };
  /*************************************************************************************************** */
  render() {
    const { workSpace, errors } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Card
            title="Add work space for this job "
            category={
              errors.workspace && (
                <div style={{ color: "red" }}>
                  {errors.workspace} - Click here{" "}
                  <Link to={`/user/workSpace/${this.props.match.params.job}`}>
                    Work Space
                  </Link>
                </div>
              )
            }
            ctTableResponsive
            ctTableFullWidth
            ctTableUpgrade
            content={
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={8} mdOffset={2}>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Work Space Name ",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: workSpace.name,
                          placeholder: "Work Space Name",
                          name: "name",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    {errors.name && (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    )}

                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel> Description </ControlLabel>
                      <FormControl
                        rows="5"
                        componentClass="textarea"
                        bsClass="form-control"
                        placeholder="Here can you description the what are you doing  "
                        defaultValue={workSpace.description}
                        name="description"
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <Row>
                      <Col md={6} xs={12}>
                        <FormInputs
                          ncols={["col-md-12"]}
                          properties={[
                            {
                              label: "Deadline ",
                              type: "date",
                              bsClass: "form-control",
                              defaultValue: workSpace.deadline,
                              placeholder: "Deadline",
                              name: "deadline",
                              onChange: this.handleChange
                            }
                          ]}
                        />
                        {errors.deadline && (
                          <div style={{ color: "red" }}>{errors.deadline}</div>
                        )}
                      </Col>
                      <Col md={6} xs={12}>
                        <SelectInput
                          options={["Easy", "Hard", "Average"]}
                          properties={{
                            label: "Difficulty Level ",
                            value: workSpace.difficultyLevel,
                            name: "difficultyLevel",
                            onChange: this.handleChange
                          }}
                        />
                        {errors.difficultyLevel && (
                          <div style={{ color: "red" }}>
                            {errors.difficultyLevel}
                          </div>
                        )}
                      </Col>
                    </Row>

                    <Button
                      bsStyle="info"
                      pullRight
                      type="reset"
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </Button>
                    <Button bsStyle="info" pullRight type="submit">
                      Save
                    </Button>
                  </Col>
                </Row>
              </form>
            }
          />
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
  { CreateWorkSpaceAction }
)(withRouter(AddWorkSpace));
