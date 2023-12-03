import React, { useState } from "react";
import { Outlet } from "react-router-dom";

function Root() {
    const [loggedIn, setLoggedIn] = useState();

    return(
        <>
            <p>test</p>
            <Outlet context={[loggedIn, setLoggedIn]}/>
        </>
    )
}

export default Root;