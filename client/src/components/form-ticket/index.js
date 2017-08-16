import React from 'react'
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

const renderField = ({ tag, input, label, type, className, meta: { touched, error } }) => {
  let Component = tag
  return (
    <div className='form-group'>
      <label>{label}</label>
      <Component {...input} placeholder={label} type={type} className='form-control' />
      {touched && error ? error: ''}
    </div>
  )
}

let FormTicket = (props) => {
  const { handleSubmit, onSubmit, ticketCreatedSuccess, ticketCreatedFailure, isSubmitting} = props
  return (
    <form className='create-ticket__form' onSubmit={handleSubmit(onSubmit)}>
      <Field tag="input" label="Ticket subject:" id='subject' name='subject' component={renderField} type='text' />
      <Field tag="textarea" label="Issue description:" name='description' component={renderField} />

      <button type='submit' className="btn btn-default" disabled={isSubmitting}>Submit</button>

      {ticketCreatedFailure ? <span>Somenthin went wrong...</span>: ''}
      {ticketCreatedSuccess ? <span>Ticket was created</span>: ''}
    </form>
  );
}

FormTicket = reduxForm({
  form: 'ticket',
  validate
})(FormTicket)

export default FormTicket;
