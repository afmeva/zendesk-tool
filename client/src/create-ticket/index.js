import React from 'react';

import FormTicket from '../form-ticket'

import './styles.css';

let CreateTicket = props => {
  const handleSubmit = (values, dispatch) => {
    let { subject, description } = values

    console.log({ subject, description });

    fetch('/api/ticket', {
      method: 'POST',
      body: JSON.stringify({ subject, description }),
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(r => r.json())
    .then(console.log)
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
