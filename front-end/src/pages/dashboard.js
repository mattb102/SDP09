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
  const [queryParams, setQueryParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
  const [totalPages, setTotalPages] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  const authToken = Cookies.get("token"); // Retrieve the authentication token from the cookie

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
    fetchProperties(setProperties, setTotalPages, currentPage, authToken);
  }, [currentPage, totalPages, authToken, isLoggedIn, setIsLoggedIn, navigate]);

  return isLoggedIn && (
    <Box>
      <Navbar setIsLoggedIn={setIsLoggedIn} setCurrentPage={setCurrentPage}/>
      <Search/>
      <Flex justify='space-around' wrap='wrap'>
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            property={property}
          />
        ))}
      </Flex>
      <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
    </Box>
  );
}

export default Dashboard;