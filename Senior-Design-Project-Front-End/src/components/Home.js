import React from "react";
import { Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Home(props) {
    const [loggedIn, setLoggedIn] = useOutletContext();

    /*if (!loggedIn) {
        return (
            <Navigate to ="/sign-in"/>
        );
    }*/

    return (
        <p>This is the home page!</p>
    );
}

export default Home;