import React from 'react';

import FormContainer from '../../containers/formContainer'

import './styles.css';

let CreateTicket = props => {
  return (
    <div className="create-ticket">
      <div>
        <h2>Ticketer!</h2>
      </div>
      <FormContainer />
    </div>
  );
}

export default CreateTicket;
