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

      <Field tag="input" label="Ticket subject:" id='subject' name='subject' component={renderField} type='text' />
      <Field tag="textarea" label="Issue description:" name='description' component={renderField} />
      <button type='submit' className="btn btn-default center-block" disabled={isSubmitting}>Submit</button>
    </form>
  );
}

FormTicket = reduxForm({
  form: 'ticket',
  validate
})(FormTicket)

export default FormTicket;
