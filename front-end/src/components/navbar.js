import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

function Navbar() {
  return(
    <Box fontFamily='' bg="black" p={4} color="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">Outreach</Text>
        <Button variant="outline" colorScheme="whiteAlpha">
          Logout
        </Button>
      </Flex>
    </Box>
  );
}

export default Navbar;