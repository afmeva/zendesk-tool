import { connect } from 'react-redux'
import { createTicket } from '../actions'
import Form from '../components/form-ticket'

const mapStateToProps = ({ formTicket }) => {
  const { ticketCreatedSuccess, ticketCreatedFailure, isSubmitting } = formTicket
  return {
    isSubmitting,
    ticketCreatedSuccess,
    ticketCreatedFailure
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (props) => {
      dispatch(createTicket(props))
    }
  }
}

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

export default FormContainer
