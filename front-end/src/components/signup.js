import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername]= useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the CSRF token from the cookie and store it in state
    const token = Cookies.get('csrftoken');
    // You can set it in state or directly use it while making the request
  }, []);

  function handleSignUp(event) {
    event.preventDefault();
    const csrfToken = Cookies.get('csrftoken'); // Retrieve CSRF token from the cookie

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
    };

    fetch('api/users/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ username, email, password }),
    })
    .then(response => {
      if (response.ok) {
        // Successful sign up
        // Redirect or perform any other action
      } else {
        // Handle error responses from backend
        return response.json().then(data => {
          setError(data.message); // Set error message received from the backend
        });
      }
    })
    .catch(error => {
      setError('An error occurred. Please try again.'); // Catch any other errors
    });
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <label>Username:</label><br />
        <input value={username} onChange={e => setUsername(e.target.value)} /><br /><br />
        <label>Email:</label><br />
        <input value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
        <label>Password:</label><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
        <label>Re-enter Password:</label><br />
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /><br /><br />
        <input type="submit" value="Sign Up" />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Already have an account? <Link to="/sign-in">Sign In</Link></p>
    </div>
  );
}

export default SignUp;