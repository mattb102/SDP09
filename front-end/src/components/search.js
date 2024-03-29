import React from 'react';
import { Box, Flex, Input, Button } from '@chakra-ui/react';

function SearchBar() {
  return (
    <Box p={4}>
      <Flex alignItems="center">
        <Input placeholder="Search..."/>
        <Button colorScheme='blackAlpha' bg="gray" borderRadius={1}>Search</Button>
        <Button ml={4} colorScheme="blackAlpha" borderRadius={1}>
          Filters
        </Button>
        {/* Add more filter buttons as needed */}
      </Flex>
    </Box>
  );
};

export default SearchBar;