import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css'

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failedLogin, setFailedLogin] = useState(false);

    const navigate = useNavigate();

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
        <>
        <div className="login-banner">
          <div className="product-title">
            <h1>Outreach</h1>
            <p>REALTY SERVICING</p>
          </div>
        </div>
        <div className="login-form-container">
          <div className="login-form">
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
              onClick={handleSubmit}
              value={"LOG IN"} />
          </div>
      </div>
      </>
    );
}

export default Login;