import React, { Component } from 'react';
import { connect } from 'react-redux'

import FormContainer from '../../containers/formContainer'
import { checkLogin } from '../../actions'

import './styles.css';

class CreateTicket extends Component {
  componentDidMount() {
    this.props.checkLogin()
  }

  render() {
    const { isAuthenticated } = this.props
    if(isAuthenticated) {
      return (<div className="create-ticket">
        <div>
          <h2>Ticketer!</h2>
        </div>
        <FormContainer />
      </div>)
    }
    return <span>redirecting to auth0</span>
  }
}

const mapStateToProps = ( {authentication} ) => {
  return {
    isAuthenticated: authentication.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: (value) => {
      dispatch(checkLogin(value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTicket);
