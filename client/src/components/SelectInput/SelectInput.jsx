import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";

function LabelForm({ label }) {
  return <Label>{label}</Label>;
}
export class FormInputs extends Component {
  render() {
    return (
      <FormGroup>
        <LabelForm {...this.props.properties} />
        <Input type="select" {...this.props.properties}>
          {this.props.options.map(option => (
            <option>{option}</option>
          ))}
        </Input>
      </FormGroup>
    );
  }
}

export default FormInputs;
