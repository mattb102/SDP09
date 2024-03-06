import React, { useState, useEffect } from "react";
import Information from "../../components/information";
import Properties from "../../components/properties";
import Navbar from "../../components/navbar";
import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../features/authenticatedSlice'
import { useNavigate } from 'react-router-dom';

import "./home.css";
import SearchBar from "../../components/search";

function Home(props) {
  const isLoggedIn = useSelector((state) => state.authenticated.value)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(1);
  const authToken = Cookies.get("token"); // Retrieve the authentication token from the cookie

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("api/house/", {
          method: "GET",
          headers: {
            Authorization: `Token ${authToken}`, // Include the authentication token in the request headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProperties(data); // Update state with fetched property data
          setCurrentProperty(data[0]);
        } else {
          console.error("Failed to fetch properties:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [authToken]); // Include authToken in the dependency array to trigger the effect when it changes

  return (
    <div className="home-page">
      <Navbar />
      <SearchBar />
      <div className="home-page-properties">
        <Information currentProperty={currentProperty}/>
        <Properties properties={properties} setCurrentProperty={setCurrentProperty}/>
      </div>
    </div>
  );
}

export default Home;