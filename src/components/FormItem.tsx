import React, {Component} from 'react';
import FormContext from "../utils/FormContext";
import {FormItemProps} from "../utils/types";

class FormItem extends Component<FormItemProps> {
  static contextType = FormContext;

  render() {
    const {label, field} = this.props;
    const {requiredFields, errorFields} = this.context;
    const isRequired = requiredFields.indexOf(field) !== -1;
    return (
      <div className="field">
        <label className="label">
          {isRequired && (<span className="has-text-danger">*</span>)}
          <span>{label}</span>
        </label>
        <div className="control">
          {this.props.children}
        </div>
        {errorFields[field] && (
          <p className="help is-danger">{errorFields[field]}</p>
        )}
      </div>
    )
  }
}

export default FormItem;
