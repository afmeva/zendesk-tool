import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
        <div className="container">
          <h2 className="text-center">Ticketer!</h2>
          <Form { ...this.props.formTicket } onSubmit={ onSubmit }/>
        </div>
      )
    }
    return <span>redirecting to auth0</span>
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
)(CreateTicket);
