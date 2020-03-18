import React, {Component} from 'react';
import FormContext from "../utils/FormContext";
import {FormItemProps} from "../utils/types";

class TextArea extends Component<any> {
  static contextType = FormContext;

  render() {
    const {field, className} = this.props;
    const {errorFields} = this.context;
    return (
      <textarea {...this.props} className={`textarea ${errorFields[field] ? 'is-danger' : ''} ${className || ''}`} />
    )
  }
}

export default TextArea;
