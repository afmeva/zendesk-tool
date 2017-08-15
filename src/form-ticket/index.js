import React from 'react';
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (values.subject === undefined || values.subject === '') {
    errors.subject = 'Required'
  }

  if (values.description === undefined || values.description === '') {
    errors.description = 'Required'
  }

  return errors
}

const renderField = (Tag, { input, label, type, className, meta: { touched, error } }) => (
  <div className='form-group'>
    <label>{label}</label>
    <div>
      <Tag {...input} placeholder={label} type={type} className='form-control'/>
      {touched && error ? error: ''}
    </div>
  </div>
)

let FormTicket = (props) => {
  const {handleSubmit} = props

  return (
    <form className='create-ticket__form' onSubmit={handleSubmit}>
      <label>
        Ticket subject:
        <Field id='subject' name='subject' component={renderField.bind(null, 'input')} type='text' />
      </label>
      <label>
        Issue description:
        <Field name='description' component={renderField.bind(null, 'textarea')} type='text' />
      </label>

       <button type='submit' className="btn btn-default">Submit</button>
    </form>
  );
}

FormTicket = reduxForm({
  form: 'ticket',
  validate
})(FormTicket)

export default FormTicket;
