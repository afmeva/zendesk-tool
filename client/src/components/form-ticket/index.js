import React from 'react'
import { Field, reduxForm } from 'redux-form'

import './index.css'

const isEmpty = (value) => {
  return (value === undefined || value === '')
}
const validate = values => {
  const errors = {}
  if (isEmpty(values.subject)) {
    errors.subject = 'Required'
  }

  if (isEmpty(values.description)) {
    errors.description = 'Required'
  }

  if (isEmpty(values.costumer_name)) {
    errors.costumer_name = 'Required'
  }

  if (isEmpty(values.costumer_email)) {
    errors.costumer_email = 'Required'
  }

  return errors
}

const renderField = ({ tag, input, label, type, className, meta: { touched, error } }) => {
  let Component = tag
  return (
    <div className="form-group">
      <label className="col-xs-3 control-label">{label}</label>
      <div className="col-xs-9">
        <Component {...input} placeholder={label}
          type={type}
          className={`form-control ${touched && error?'has-error':''} ${touched && !error?'has-success':''}`}
        />

        {touched && error ?
          <div className="alert alert-danger">
            <strong>jmm!</strong> This field is required!
          </div>: ''}
      </div>
    </div>
  )
}

let FormTicket = (props) => {
  const { handleSubmit, onSubmit, ticketCreatedSuccess, ticketCreatedFailure, isSubmitting} = props
  return (
    <div className='row'>
      <form className='form-horizontal col-xs-12' onSubmit={handleSubmit(onSubmit)}>
        {ticketCreatedFailure ?
          <div className="auth0-notification-global danger">
            <div className="container"><i className="notification-icon icon-budicon-354"></i>
              <p>well... Something was wrong.</p>
            </div>
          </div>: ''}

        {ticketCreatedSuccess ?
          <div className="auth0-notification-global primary">
            <div className="container"><i className="notification-icon icon-budicon-764"></i>
              <p>yes!! Ticket was created.</p>
            </div>
          </div>: ''}

        <h2 className="form-ticket__title">Costumer information:</h2>
        <Field tag="input" label="Costumer name:" name='costumer_name' component={renderField} type='text' />
        <Field tag="input" label="Costumer email:" name='costumer_email' component={renderField} type='email' />

        <h2 className="form-ticket__title">Issue information:</h2>
        <Field tag="input" label="Ticket subject:" name='subject' component={renderField} type='text' />
        <Field tag="textarea" label="Issue description:" name='description' component={renderField} />

        <div className="col-xs-12 text-center">
          <button type='submit' className="btn btn-primary" disabled={isSubmitting}>Submit</button>
        </div>
      </form>
    </div>
  )
}

FormTicket = reduxForm({
  form: 'ticket',
  validate
})(FormTicket)

export default FormTicket
