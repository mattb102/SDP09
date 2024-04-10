import React, {useState} from "react";
import { Outlet } from "react-router-dom";

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

  return(
    <div>
      <Outlet context={[isLoggedIn, setIsLoggedIn]}/>
    </div>
  );
}

export default Root;