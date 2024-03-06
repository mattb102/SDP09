import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../features/authenticatedSlice'

import Cookies from 'js-cookie';

import './login.css'

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedLogin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  async function handleSubmit(event) {
    event.preventDefault();
    const csrfToken = Cookies.get('csrftoken'); // Retrieve CSRF token from the cookie

    try {
      const response = await fetch('api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirect or perform actions upon successful login
	      const data = await response.json(); // Parse the response body
      	const token = data.token; // Assuming the token is returned in the response body
      	Cookies.set('token', token, { path: '/', sameSite: 'strict', secure: true });
        dispatch(login())
        navigate('/dashboard'); // Redirect to dashboard or any other route
      } else {
        // Handle failed login
        setFailedLogin(true);
      }
    } catch (error) {
      // Handle any other errors
      console.error('Login error:', error);
      setFailedLogin(true);
    }
  }

  return (
    <div className="login-page">
      <div className="login-banner">
        <div className="product-title">
          <h1>Outreach</h1>
          <p>REALTY SERVICING</p>
        </div>
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="form-title">Login</p>
          <br />
          <input
            value={username}
            placeholder="Email"
            onChange={ev => setUsername(ev.target.value)}
            className={"input-box"} />
          <br />
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={ev => setPassword(ev.target.value)}
            className={"input-box"} />
          <br />
          <input
            className={"input-button"}
            type="submit"
            value={"LOG IN"} />
        </form>
        {failedLogin && <p className="failed-login">Login failed. Try again.</p>}
      </div>
    </div>
  );
}

export default Login;