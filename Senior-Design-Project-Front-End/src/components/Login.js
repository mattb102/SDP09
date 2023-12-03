import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>Username</label><br/>
                <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                /><br/><br/>
                <label>Password</label><br/>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                /><br/><br/>
                {failedLogin && <p className="failed">Incorrect credentials. Try again.</p>}
                <input type="submit" value="Log In"/>
            </form>
            <p>Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
        </div>
    );
}

export default Login;