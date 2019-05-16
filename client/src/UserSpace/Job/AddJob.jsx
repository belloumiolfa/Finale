import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
  Form
} from "react-bootstrap";
//import routing dependencis
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { AddJobAction } from "../../Redux/Actions/JobAction";
//import components
import Card from "components/Card/Card";
import Button from "components/CustomButton/CustomButton";
import FormInputs from "../../components/FormInputs/FormInputs";
import Radio from "../../components/CustomRadio/CustomRadio";
import SelectInput from "../../components/SelectInput/SelectInput";

//import variables
import { sector, contract, region } from "../../variables/Variables";
/******************************************************************************************************** */
class AddJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      job: {},
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
      job: { ...this.state.job, [e.target.name]: e.target.value }
    });
  };
  /*************************************************************************************************** */

  handleSubmit = e => {
    e.preventDefault();

    this.props.AddJobAction(this.state.job);
  };
  /*************************************************************************************************** */
  render() {
    const { job, errors } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Card
            title="Add new job "
            category="Are you looking for more components? Please check our Premium Version of Light Bootstrap Dashboard React."
            ctTableResponsive
            ctTableFullWidth
            ctTableUpgrade
            content={
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={8} mdOffset={2}>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Job title ",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: job.title1,
                          placeholder: "Job title",
                          name: "title1",
                          onChange: this.handleChange
                        },
                        {
                          label: "Sub. Title",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: job.title2,
                          placeholder: "Sub. Title",
                          name: "title2",
                          onChange: this.handleChange
                        }
                      ]}
                    />

                    {errors.title1 && (
                      <div style={{ color: "red" }}>{errors.title1}</div>
                    )}

                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Job description </ControlLabel>
                      <FormControl
                        rows="5"
                        componentClass="textarea"
                        bsClass="form-control"
                        placeholder="Here can you description the job "
                        defaultValue={job.description}
                        name="description"
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Deadline ",
                          type: "date",
                          bsClass: "form-control",
                          defaultValue: job.deadline,
                          placeholder: "Deadline",
                          name: "deadline",
                          onChange: this.handleChange
                        },
                        {
                          label: "Salary",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: job.salary,
                          placeholder: "Salary",
                          name: "salary",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <Row>
                      <Col>
                        {errors.deadline && (
                          <div style={{ color: "red" }}>{errors.deadline}</div>
                        )}
                      </Col>
                      <Col>
                        {errors.salary && (
                          <div style={{ color: "red" }}>{errors.salary}</div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <Radio
                          number="1"
                          label="Part time"
                          value="Part time"
                          name="schedule"
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col md={3}>
                        <Radio
                          number="2"
                          label="Full time"
                          value="Full time"
                          name="schedule"
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col md={3}>
                        <Radio
                          number="3"
                          label="Intership"
                          value="Intership"
                          name="schedule"
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col md={3}>
                        <Radio
                          number="4"
                          label="Freelancing"
                          value="Freelancing"
                          name="schedule"
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                    {errors.schedule && (
                      <div style={{ color: "red" }}>{errors.schedule}</div>
                    )}
                    <Row>
                      <Col md={4}>
                        <SelectInput
                          options={sector}
                          properties={{
                            label: "Sector ",
                            value: job.sector,
                            name: "sector",
                            onChange: this.handleChange
                          }}
                        />{" "}
                        {errors.sector && (
                          <div style={{ color: "red" }}>{errors.sector}</div>
                        )}
                      </Col>

                      <Col md={4}>
                        <SelectInput
                          options={contract}
                          properties={{
                            label: "Contract",
                            value: job.contract,
                            name: "contract",
                            onChange: this.handleChange
                          }}
                        />
                      </Col>

                      <Col md={4}>
                        <SelectInput
                          options={region}
                          properties={{
                            label: "Region ",
                            value: job.region,
                            name: "region",
                            onChange: this.handleChange
                          }}
                        />
                        {errors.region && (
                          <div style={{ color: "red" }}>{errors.region}</div>
                        )}
                      </Col>
                    </Row>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Contact Email",
                          type: "email",
                          bsClass: "form-control",
                          defaultValue: job.email,
                          placeholder: "Contact Email",
                          name: "email",
                          onChange: this.handleChange
                        },
                        {
                          label: "Contact phone",
                          type: "text",
                          bsClass: "form-control",
                          defaultValue: job.phone,
                          placeholder: "Contact phone",
                          name: "phone",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <Button
                      bsStyle="info"
                      pullRight
                      type="reset"
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </Button>
                    <Button bsStyle="info" pullRight type="submit">
                      Save Job
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
  { AddJobAction }
)(withRouter(AddJob));
