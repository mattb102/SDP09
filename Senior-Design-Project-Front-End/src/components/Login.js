import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failedLogin, setFailedLogin] = useState(false);

    document.title = "Outreach Realty";

    const navigate = useNavigate();
    const database = {
        email: "test@test.com",
        password: "test"
    };

    function handleSubmit(event) {
        event.preventDefault();

        if (email === database.email && password === database.password) {
            setFailedLogin(false);
            navigate("/home");
        } else {
            setFailedLogin(true);
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>Email</label><br/>
                <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
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