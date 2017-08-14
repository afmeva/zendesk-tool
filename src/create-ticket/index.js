import React from 'react';

import FormTicket from '../form-ticket'

import './styles.css';

let CreateTicket = (props) => {
  const handleSubmit = e => {
    // e.preventDefault()
    console.log(e);
  }
  return (
    <div className="create-ticket">
      <div>
        <h2>Ticketer!</h2>
      </div>
      <FormTicket onSubmit={handleSubmit}/>
    </div>
  );
}

export default CreateTicket;
