import React, { Component } from "react";
import { Collapse, CardBody } from "reactstrap";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Row,
  Col
} from "react-bootstrap";

//import routing dependencis
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { addEducation } from "../Redux/Actions/ProfileAction";

//import compenent
import FormInputs from "../components/FormInputs/FormInputs";
import Button from "../components/CustomButton/CustomButton";
import { Card } from "../components/Card/Card";

/********************************************************************************************* */

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      edu: {},
      current: false,
      disabled: false,
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.Alert) {
      this.setState({ errors: nextProps.Alert });
    }
  }
  /*************************************************************************************************** */

  handleChange = e => {
    this.setState({
      edu: { ...this.state.edu, [e.target.name]: e.target.value }
    });
  };
  /*************************************************************************************************** */
  handleSubmit = e => {
    e.preventDefault();

    this.props.addEducation(this.state.edu, this.props.history);
  };
  /********************************************************************************************* */
  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      edu: {
        ...this.state.edu,
        current: !this.state.current
      }
    });
  };
  /********************************************************************************************* */

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  };
  /********************************************************************************************* */

  render() {
    const { edu, errors } = this.state;
    return (
      <div>
        <Button
          bsStyle="info"
          pullLeft
          simple
          type="submit"
          onClick={this.toggle}
        >
          Add
        </Button>

        <Collapse isOpen={this.state.collapse}>
          <Card
            title="Add education"
            content={
              <CardBody>
                <form onSubmit={this.handleSubmit}>
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "School",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "School",
                        defaultValue: edu.school,
                        name: "school",
                        onChange: this.handleChange
                      }
                    ]}
                  />
                  {errors.school && (
                    <div style={{ color: "red" }}>{errors.school}</div>
                  )}
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Degree",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Degree",
                        defaultValue: edu.degree,
                        name: "degree",
                        onChange: this.handleChange
                      }
                    ]}
                  />
                  {errors.degree && (
                    <div style={{ color: "red" }}>{errors.degree}</div>
                  )}
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Field of study",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Field of study",
                        defaultValue: edu.fieldofstudy,
                        name: "fieldofstudy",
                        onChange: this.handleChange
                      }
                    ]}
                  />
                  {errors.fieldofstudy && (
                    <div style={{ color: "red" }}>{errors.fieldofstudy}</div>
                  )}
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Current",
                        type: "checkbox",
                        bsClass: "form-control",
                        placeholder: "Current",
                        defaultValue: edu.current,
                        name: "current",
                        checked: edu.current,
                        onChange: this.onCheck
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-6", "col-md-6"]}
                    properties={[
                      {
                        label: "from",
                        type: "date",
                        bsClass: "form-control",
                        placeholder: "from",
                        defaultValue: edu.from,
                        name: "from",
                        onChange: this.handleChange
                      },
                      {
                        label: "to",
                        type: "date",
                        bsClass: "form-control",
                        placeholder: "to",
                        defaultValue: edu.to,
                        name: "to",
                        onChange: this.handleChange,
                        disabled: this.state.disabled ? "disabled" : ""
                      }
                    ]}
                  />
                  {errors.from && (
                    <div style={{ color: "red" }}>{errors.from}</div>
                  )}
                  <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Description </ControlLabel>
                    <FormControl
                      rows="5"
                      componentClass="textarea"
                      bsClass="form-control"
                      placeholder="Here can be your job description"
                      defaultValue={edu.description}
                      name="description"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button
                    bsStyle="info"
                    pullRight
                    type="submit"
                    style={{ marginBottom: "1rem" }}
                  >
                    Save
                  </Button>{" "}
                </form>
              </CardBody>
            }
          />
        </Collapse>
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
  { addEducation }
)(withRouter(AddEducation));
