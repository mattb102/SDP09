import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function handleSignUp(event) {
    event.preventDefault();

    
}

function SignUp(props) {
    return (
        <div className="login-form">
            <form onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
                <label>Email:</label><br/>
                <input/><br/><br/>
                <label>Password:</label><br/>
                <input
                    type="password"/><br/><br/>
                <label>Re-enter Password:</label><br/>
                <input
                    type="password"/><br/><br/>
                <input type="submit" value="Sign Up"/>
            </form>
            <p>Already have an account? <Link to="/sign-in">Sign In</Link></p>
        </div>
    );
}

export default SignUp;