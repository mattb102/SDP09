import React from "react";
import { Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Information from "../../components/information";
import Properties from "../../components/properties";
import "./home.css"

function Home(props) {
  const [loggedIn, setLoggedIn] = useOutletContext();

  /*if (!loggedIn) {
    return (
      <Navigate to ="/sign-in"/>
    );
  }*/

  return (
    <div className="home-page">
      <Information />
      <Properties />
    </div>
  );
}

export default Home;