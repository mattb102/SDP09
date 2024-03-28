import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import Navbar from '../components/navbar';
import Search from '../components/search';
import PropertyCard from '../components/property-card';

function Dashboard() {
  return(
    <Box>
      <Navbar/>
      <Search/>
      <Flex>
        <PropertyCard/>
        <PropertyCard/>
        <PropertyCard/>
        <PropertyCard/>
        <PropertyCard/>
        <PropertyCard/>
      </Flex>
    </Box>
  );
}

export default Dashboard;