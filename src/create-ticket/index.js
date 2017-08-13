import React from 'react';
import './styles.css';

const CreateTicket = () => {
  return (
    <div className="create-ticket">
      <div>
        <h2>Ticketer!</h2>
      </div>
      <form className="create-ticket__form">
        <label>
          Ticket subject:
          <input type='text' />
        </label>

        <label>
          Issue description:
          <textarea type='text' className="materialize-textarea"/>
        </label>
      </form>
    </div>
  );
}

export default CreateTicket;
