import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Information from "../../components/information";
import Properties from "../../components/properties";
import "./home.css";
import Cookies from 'js-cookie';

function Home(props) {
  const [loggedIn, setLoggedIn] = useOutletContext();
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    // Fetch houses data when the component mounts
    async function fetchHouses() {
      try {
        const token = Cookies.get("token"); // Retrieve token from cookie
        const response = await fetch("/api/house/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setHouses(data.slice(0, 3)); // Set the first 3 houses in state
        } else {
          console.error("Failed to fetch houses:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    }

    fetchHouses();

    // Cleanup function to clear state on component unmount
    return () => {
      setHouses([]);
    };
  }, []); // Empty dependency array to run effect only once on mount

  /*if (!loggedIn) {
    return (
      <Navigate to ="/sign-in"/>
    );
  }*/

  return (
    <div className="home-page">
      <Information />
      <Properties houses={houses} />
    </div>
  );
}

export default Home;

