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
  const [currentProperty, setCurrentProperty] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
  const [totalPages, setTotalPages] = useState(1);
  const [maxPrice, setMaxPrice] = useState(999999999999);
  const authToken = Cookies.get("token"); // Retrieve the authentication token from the cookie

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`api/house/?page=${currentPage}&page_size=10&max_price=${maxPrice}`, { // Include page query parameter
          method: "GET",
          headers: {
            Authorization: `Token ${authToken}`, // Include the authentication token in the request headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProperties(data.results); // Updated state with fetched property data (assuming data.results contains the properties)
          setTotalPages(Math.ceil(data.count / 10));
          console.log(totalPages);
          if (Object.keys(currentProperty).length === 0) setCurrentProperty(data.results[0]); // Set the current property
        } else {
          console.error("Failed to fetch properties:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [currentPage, authToken, maxPrice]); // Include currentPage in the dependency array to trigger the effect when it changes

  return (
    <div className="home-page">
      <Navbar />
      <SearchBar maxPrice={maxPrice} setMaxPrice={setMaxPrice}/>
      <div className="home-page-properties">
        <Information currentProperty={currentProperty}/>
        <Properties 
          properties={properties}
          setCurrentProperty={setCurrentProperty}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={totalPages}/>
      </div>
    </div>
  );
}

export default Home;