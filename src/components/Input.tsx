import React, {Component} from 'react';
import FormContext from "../utils/FormContext";
import {FormItemProps} from "../utils/types";

class Input extends Component<any> {
  static contextType = FormContext;

  render() {
    const {field, className} = this.props;
    const {errorFields} = this.context;
    return (
      <input {...this.props} className={`input ${errorFields[field] ? 'is-danger' : ''} ${className || ''}`} />
    )
  }
}

export default Input;
