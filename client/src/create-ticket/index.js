import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './index.css'

import { checkLogin, createTicket } from '../actions'
import Form from '../components/form-ticket'

class CreateTicket extends Component {
  componentDidMount() {
    this.props.checkLogin()
  }

  render() {
    const { isAuthenticated, onSubmit } = this.props
    if(isAuthenticated) {
      return (
        <div className='container create-ticket-app'>
          <div className="page-header">
            <h1>Ticketer</h1>
          </div>
          <Form { ...this.props.formTicket } onSubmit={ onSubmit }/>
        </div>
      )
    }
    return (
      <div className='create-ticket-loader spinner spinner-lg is-auth0'>
        <div className='circle'></div>
      </div>
    )
  }
}

const mapStateToProps = ( { authentication, formTicket } ) => {
  return {
    isAuthenticated: authentication.isAuthenticated,
    formTicket
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    checkLogin,
    onSubmit: createTicket
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTicket)
