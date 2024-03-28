import React from 'react';
import { Box, Flex, Input, Button } from '@chakra-ui/react';

function SearchBar() {
  return (
    <Box p={4}>
      <Flex alignItems="center">
        <Input placeholder="Search..."/>
        <Button colorScheme='blackAlpha' bg="gray">Search</Button>
        <Button ml={4} colorScheme="blackAlpha">
          Filters
        </Button>
        {/* Add more filter buttons as needed */}
      </Flex>
    </Box>
  );
};

export default SearchBar;