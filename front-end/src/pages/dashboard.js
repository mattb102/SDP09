import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Cookies from 'js-cookie';

import Navbar from '../components/navbar';
import Search from '../components/search';
import Paging from "../components/paging";
import PropertyCard from '../components/property-card';
import fetchProperties from "../utilities/fetch-properties";

function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
  const [totalPages, setTotalPages] = useState(1);
  // const [maxPrice, setMaxPrice] = useState(999999999999);
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  const authToken = Cookies.get("token"); // Retrieve the authentication token from the cookie

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    fetchProperties(setProperties, setCurrentProperty, totalPages, setTotalPages, currentPage, authToken);
  }, [currentPage, totalPages, authToken]);

  return isLoggedIn && (
    <Box>
      <Navbar setIsLoggedIn={setIsLoggedIn}/>
      <Search/>
      <Flex justify='space-around' wrap='wrap'>
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            property={property}
            setCurrentProperty={setCurrentProperty}
          />
        ))}
      </Flex>
      <Paging/>
    </Box>
  );
}

export default Dashboard;