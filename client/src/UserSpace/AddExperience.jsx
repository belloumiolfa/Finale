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
import { addExperience } from "../Redux/Actions/ProfileAction";

//import compenent
import FormInputs from "../components/FormInputs/FormInputs";
import Button from "../components/CustomButton/CustomButton";
import { Card } from "../components/Card/Card";

/********************************************************************************************* */

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      exp: {},
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
      exp: { ...this.state.exp, [e.target.name]: e.target.value }
    });
  };
  /*************************************************************************************************** */
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.exp);

    this.props.addExperience(this.state.exp, this.props.history);
  };
  /************************************************************************************************** */
  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      exp: {
        ...this.state.exp,
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
    const { exp, errors } = this.state;
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
            title="Add experience"
            content={
              <CardBody>
                <form onSubmit={this.handleSubmit}>
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Title",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Title",
                        defaultValue: exp.title,
                        name: "title",
                        onChange: this.handleChange
                      }
                    ]}
                  />
                  {errors.title && (
                    <div style={{ color: "red" }}>{errors.title}</div>
                  )}
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Company",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Company",
                        defaultValue: exp.company,
                        name: "company",
                        onChange: this.handleChange
                      }
                    ]}
                  />
                  {errors.company && (
                    <div style={{ color: "red" }}>{errors.company}</div>
                  )}
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Location",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Location",
                        defaultValue: exp.location,
                        name: "location",
                        onChange: this.handleChange
                      }
                    ]}
                  />

                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Current",
                        type: "checkbox",
                        bsClass: "form-control",
                        placeholder: "Current",
                        defaultValue: exp.current,
                        name: "current",
                        checked: exp.current,
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
                        defaultValue: exp.from,
                        name: "from",
                        onChange: this.handleChange
                      },
                      {
                        label: "to",
                        type: "date",
                        bsClass: "form-control",
                        placeholder: "to",
                        defaultValue: exp.to,
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
                      defaultValue={exp.description}
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
                  </Button>
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
  { addExperience }
)(withRouter(AddExperience));
