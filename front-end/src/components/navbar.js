import React from "react";
import { Link } from "react-router-dom"
import { Box, Flex, Text, Button } from "@chakra-ui/react";

import logout from "../utilities/logout";

function Navbar({setIsLoggedIn}) {
  return(
    <Box fontFamily='' bg="#0F0F0F" p={4} color="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="300">Outreach Home Realty</Text>
        <Link to='/'><Button colorScheme="whiteAlpha" borderRadius={0} onClick={() => logout(setIsLoggedIn)}>Logout</Button></Link>
      </Flex>
    </Box>
  );
}

export default Navbar;