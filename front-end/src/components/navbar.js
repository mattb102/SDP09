import React from "react";
import { Link } from "react-router-dom"
import { Box, Flex, Text, Button } from "@chakra-ui/react";

function Navbar() {
  return(
    <Box fontFamily='' bg="#0F0F0F" p={4} color="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">Outreach</Text>
        <Link to='/'><Button colorScheme="whiteAlpha">Logout</Button></Link>
      </Flex>
    </Box>
  );
}

export default Navbar;