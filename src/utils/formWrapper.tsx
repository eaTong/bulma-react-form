import React, {cloneElement, ReactElement} from "react";
import {DynamicObject, FormProps, FormWrapperProps, FormWrapperState, FieldOption} from "./types";
import FormContext from "./FormContext";


function formWrapper<T>(WrappedComponent: React.ComponentType<FormProps>) {
  return class FormBase extends React.Component<any, FormWrapperState> {
    validation: DynamicObject;

    constructor(props: T) {
      super(props);
      this.validation = {};
      this.state = {form: {}, requiredFields: [], errorFields: {}}
    }

    getFormInstance() {
      const form: FormWrapperProps = {
        setFieldsValue: this.setFieldsValue,
        validateFields: this.validateFields,
        getFieldsValue: (callback: Function) => {
          this.validateFields((error: any) => callback(error, this.state.form));
          return this.state.form;
        },
        getFieldDecorator: this.getFieldDecorator
      };
      return form;
    }

    validateFields = (callback?: Function) => {
      const {form} = this.state;
      const errorFields = {};
      for (const key in this.validation) {
        const rules = this.validation[key];
        for (const rule of rules) {
          if (rule.required && !form[key]) {
            errorFields[key] = rule.message;
          }
        }
      }
      callback && callback(Object.keys(errorFields).length === 0 ? null : errorFields);
      this.setState({errorFields})
    };

    onValueChange = (event: any, field: string, options: FieldOption) => {
      const value = (event && event.target) ? event.target[options.valuePropName || 'value'] : event;
      const {form} = this.state;
      form[field] = value;
      this.setFieldsValue(form, () => this.validateFields());
    };

    setFieldsValue = (form: any, callback?: Function) => this.setState({form: {...this.state.form, ...form}}, () => callback && callback());

    getFieldDecorator = (field: string, options: FieldOption) => {
      const {form, requiredFields} = this.state;
      return (children: ReactElement) => {
        const onChange = (event: any) => this.onValueChange(event, field, options);
        const propsInject: DynamicObject = {};
        propsInject.onChange = onChange;
        if (options.trigger) {
          propsInject[options.trigger] = onChange;
        }
        if (options.valuePropName) {
          propsInject[options.valuePropName] = form[field];
        } else {
          propsInject.value = form[field];
        }

        if (options.rules) {
          this.validation[field] = options.rules;
          for (const rule of options.rules) {
            if (rule.required && requiredFields.indexOf(field) === -1) {
              requiredFields.push(field);
            }
          }
        }
        return cloneElement(children, {...propsInject, field})
      }
    };

    render() {
      const {requiredFields, errorFields} = this.state;
      return (
        <FormContext.Provider value={{requiredFields, errorFields}}>
          <WrappedComponent {...(this.props as T)} form={this.getFormInstance()}/>
        </FormContext.Provider>
      );
    }
  };
}

export default formWrapper;
