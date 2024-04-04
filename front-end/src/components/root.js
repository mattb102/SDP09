import React, {useState} from "react";
import { Outlet } from "react-router-dom";

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return(
    <div>
      <Outlet context={[isLoggedIn, setIsLoggedIn]}/>
    </div>
  );
}

export default Root;