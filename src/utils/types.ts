export interface DynamicObject {
  [key: string]: any
}

export interface FormWrapperProps {
  getFieldsValue: Function,
  setFieldsValue: Function,
  validateFields: Function,
  getFieldDecorator: Function
}

export interface TagType {
  id: number,
  name: string,
}

export interface FormWrapperState {
  form: DynamicObject,
  requiredFields: Array<string>,
  errorFields: DynamicObject
}

export interface FormProps {
  form: FormWrapperProps
}

export interface Rule {
  required?: boolean,
  message: string,
  validator?: Function
}

export interface FieldOption {
  onChange?: Function,
  valuePropName?: string,
  trigger?: string,
  rules?: Array<Rule>,
}

export interface FormItemProps {
  label: string,
  field: string,
}
