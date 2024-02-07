import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function Root() {
    const [loggedIn, setLoggedIn] = useState();

    return(
        <>
            <Navbar />
            <Outlet context={[loggedIn, setLoggedIn]}/>
        </>
    )
}

export default Root;