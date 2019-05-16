import React, { Component } from "react";

class CustomRadio extends Component {
  render() {
    const { number, label, value, name, ...rest } = this.props;

    return (
      <div className="radio">
        <input id={number} name={name} type="radio" value={value} {...rest} />
        <label htmlFor={number}>{label}</label>
      </div>
    );
  }
}

export default CustomRadio;
