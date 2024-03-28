import React from 'react';
import { Box, Flex, Input, Button } from '@chakra-ui/react';

function SearchBar() {
  return (
    <Box p={4}>
      <Flex alignItems="center">
        <Input placeholder="Search..."/>
        <Button colorScheme="blue">Search</Button>
        <Button ml={4} colorScheme="blue">
          Filters
        </Button>
        {/* Add more filter buttons as needed */}
      </Flex>
    </Box>
  );
};

export default SearchBar;