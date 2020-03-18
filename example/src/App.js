import React, {Component} from 'react'

import {formWrapper, FormItem , Input} from 'bulma-react-form'

class App extends Component {
  render() {
    const {form} = this.props;
    return (
      <div className='container'>
        <FormItem label='asdfasdf' field={'test'}>
          {form.getFieldDecorator('test', {rules: [{required: true, message: 'test message'}]})(
            <Input placeholder={'asdfsdf'}/>
          )}
        </FormItem>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={() => form.validateFields()}>提交</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default formWrapper(App);
