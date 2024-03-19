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
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
  const authToken = Cookies.get("token"); // Retrieve the authentication token from the cookie

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`api/house/?page=${currentPage}&page_size=10`, { // Include page query parameter
          method: "GET",
          headers: {
            Authorization: `Token ${authToken}`, // Include the authentication token in the request headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProperties(data.results); // Updated state with fetched property data (assuming data.results contains the properties)
          setCurrentProperty(data.results[0]); // Set the current property
        } else {
          console.error("Failed to fetch properties:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [currentPage, authToken]); // Include currentPage in the dependency array to trigger the effect when it changes

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1); // Increment the current page
  };

  return (
    <div className="home-page">
      <Navbar />
      <SearchBar />
      <div className="home-page-properties">
        <Information currentProperty={currentProperty}/>
        <Properties properties={properties} setCurrentProperty={setCurrentProperty}/>
        <button onClick={handleNextPage}>Next</button> {/* Render the "Next" button */}
      </div>
    </div>
  );
}

export default Home;

