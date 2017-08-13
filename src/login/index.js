import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css';

const Login = () => {
  return (
    <div>
      <div>
        <h2>Login!</h2>
      </div>
      <Link to='/create-ticket'>Login</Link>
    </div>
  );
}

export default Login;
