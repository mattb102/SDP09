import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Welcome(props) {
    return(
        <div>
            <h1>Welcome</h1>
            <Link to="/sign-in"><button>Sign In</button></Link>
        </div>
    );
}

export default Welcome;